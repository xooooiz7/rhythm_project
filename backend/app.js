const express = require("express");
const app = express();
const { spawn } = require("child_process");

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/getRequest", (req, res) => {
  res.send("hello world successful get request");
});

app.post("/postRequest", (req, res) => {
  const url = req.body.url; //รับ link Url จาก front ผ่าน body
  // function เรียกใช้งาน musicProcessing.py
  const runPythonScript = (url) => {
    //download เสร็จก่อนถึงจะทำอย่างอื่นได้
    return new Promise((resolve, reject) => {
      //set up ให้ใช้ python ได้ โดยเรียกใช้ musicProcessing ส่ง paramiter url ไปใน function download
      const process = spawn("python", ["musicProcessing.py", url]);

      // console process ที่กำลังทำงานอยู่
      process.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
      //ถ้ามี error จะ console ออกมา
      process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });
      //เมื่อทำงานเสร็จ จะปิด
      process.on("close", (code) => {
        if (code === 0) {
          resolve("Finished download"); //ถ้าdownloadเสร็จ จะส่ง
        } else {
          reject(`Process exited with code ${code}`); //ถ้ามีerror
        }
      });
    });
  };

  // เรียกใช้งาน function runPythonScript
  runPythonScript(url)
    .then((message) => {
      res.send(message);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(5000, () => {
  console.log("Server started successfully at port 5000");
});
