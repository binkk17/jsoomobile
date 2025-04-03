const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

// Tạo router từ file JSON
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));

// Cấu hình middlewares mặc định của json-server
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Thêm route custom
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

// Sử dụng router và bắt đầu server
server.use(router);

// Lắng nghe tại port 3000
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});

// Export server (nếu cần dùng ở module khác)
module.exports = server;
