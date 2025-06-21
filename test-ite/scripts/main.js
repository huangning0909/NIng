const myImage = document.querySelector("img");
myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/111.png") {
    myImage.setAttribute("src", "images/222.png");
  } else {
    myImage.setAttribute("src", "images/111.png");
  }
};

// let myButton = document.querySelector("button");
// let myHeading = document.querySelector("h1");
// function setUserName() {
//   const myName = prompt("Please enter your name.","name");
//   if (!myName) {
//     setUserName();
//   } else {
//     localStorage.setItem("name", myName);
//     myHeading.textContent = `Mozilla is cool, ${myName}`;
//   }
// };
// if (!localStorage.getItem("name")) {
//   setUserName();
// } else {
//   const storedName = localStorage.getItem("name");
//   myHeading.textContent = `Mozilla is cool, ${storedName}`;
// }
// myButton.onclick = () => {
//   setUserName();
// };

const myButton = document.querySelector("button");
const myHeading = document.querySelector("h1");

// 添加输入验证函数
const validateName = (name) => {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 20 && 
         !/[<>]/.test(trimmed); // 禁止HTML标签符号
};

// 改进的用户名设置函数（非递归）
async function setUserName() {
  try {
    let myName;
    while (true) {
      myName = prompt("请输入您的名字（2-20个字符，不能包含<>符号）:");
      if (myName === null) return; // 用户取消输入
      if (validateName(myName)) break;
      alert("输入无效：请确保长度2-20且不含<>符号");
    }

    await localStorage.setItem("name", myName.trim());
    updateGreeting(myName);
  } catch (e) {
    console.error("存储失败:", e);
    myHeading.textContent = "Mozilla is cool, 访客";
  }
}

// 分离显示逻辑
function updateGreeting(name) {
  myHeading.textContent = `Mozilla is cool, ${name}`;
}

// 初始化逻辑
(async function init() {
  try {
    const storedName = await localStorage.getItem("name");
    storedName ? updateGreeting(storedName) : setUserName();
  } catch (e) {
    console.error("初始化失败:", e);
    myHeading.textContent = "Mozilla is cool";
  }
})();

// 事件绑定（添加防抖）
myButton.addEventListener('click', () => {
  setTimeout(setUserName, 300);
});
