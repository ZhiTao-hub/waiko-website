#!/usr/bin/env node

/**
 * Performance Testing Script
 * Run this after building to check bundle sizes and performance metrics
 */

const fs = require('fs');
const path = require('path');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  const distPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ Build not found. Run "npm run build" first.');
    return;
  }

  console.log('📊 Bundle Analysis\n');

  // Analyze assets
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    let totalSize = 0;
    
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    
    console.log('JavaScript Files:');
    jsFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      console.log(`  📄 ${file}: ${formatBytes(stats.size)}`);
    });
    
    console.log('\nCSS Files:');
    cssFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      console.log(`  🎨 ${file}: ${formatBytes(stats.size)}`);
    });
    
    console.log(`\n📦 Total Bundle Size: ${formatBytes(totalSize)}`);
    
    // Performance recommendations
    console.log('\n🎯 Performance Recommendations:');
    
    if (totalSize > 2 * 1024 * 1024) { // 2MB
      console.log('  ⚠️  Bundle size is large (>2MB). Consider code splitting.');
    } else if (totalSize > 1 * 1024 * 1024) { // 1MB
      console.log('  ⚡ Bundle size is moderate (>1MB). Good job on optimization!');
    } else {
      console.log('  ✅ Bundle size is excellent (<1MB). Great optimization!');
    }
    
    const largestJS = jsFiles
      .map(f => ({ name: f, size: fs.statSync(path.join(assetsPath, f)).size }))
      .sort((a, b) => b.size - a.size)[0];
    
    if (largestJS && largestJS.size > 500 * 1024) { // 500KB
      console.log(`  📋 Largest JS file: ${largestJS.name} (${formatBytes(largestJS.size)})`);
      console.log('     Consider splitting this chunk further.');
    }
  }
  
  // Check for common performance files
  console.log('\n🔍 Performance Features:');
  
  const indexHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    const content = fs.readFileSync(indexHtml, 'utf8');
    
    if (content.includes('preload')) {
      console.log('  ✅ Resource preloading detected');
    }
    
    if (content.includes('defer') || content.includes('async')) {
      console.log('  ✅ Script optimization detected');
    }
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('  1. Test with Lighthouse: npm run preview');
  console.log('  2. Deploy to Vercel and monitor Web Vitals');
  console.log('  3. Check performance in Chrome DevTools');
}

// Run the analysis
analyzeBundle();