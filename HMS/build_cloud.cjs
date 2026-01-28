const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const frontendDir = __dirname;
const backendDir = path.join(__dirname, "Backend");
const publicDir = path.join(backendDir, "public");
const distDir = path.join(frontendDir, "dist");

console.log("🚀 Starting Cloud Run Build Process...");

// 1. Build Frontend
console.log("📦 Building Frontend...");
try {
  execSync("npm run build", { stdio: "inherit", cwd: frontendDir });
} catch (error) {
  console.error("❌ Build failed:", error);
  process.exit(1);
}

// 2. Prepare Public Directory
console.log("📂 Preparing Backend public directory...");
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir);

// 3. Move Assets
console.log("🚚 Moving assets to Backend/public...");
try {
  // Copy everything from dist to Backend/public
  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName),
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursiveSync(distDir, publicDir);
  console.log("✅ Assets moved successfully!");
  console.log('✨ Ready to deploy! Run: "cd Backend && gcloud run deploy"');
} catch (error) {
  console.error("❌ Error moving files:", error);
  process.exit(1);
}
