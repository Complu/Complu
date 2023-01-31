const cells = 31;

// From 0.001 to 100
const items = [
  { name: "Huawei", img: "image/Mystery/Huawei Watch.png", chance: 10 },
  { name: "Iphone", img: "image/Mystery/Iphone11 64.png", chance: 15 },
  { name: "Marusa", img: "image/Mystery/Marusa.png", chance: 30 },
  { name: "MSI", img: "image/Mystery/MSI GF75.png", chance: 40 },
  { name: "PlayStation 5", img: "image/Mystery/PS 5 .png", chance: 10 },
  { name: "Razer", img: "image/Mystery/Razer BlackWidow.png", chance: 20 },
  { name: "Twix", img: "image/Mystery/Twix.png", chance: 60 },
];

function getItem() {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 100);

    items.forEach((elm) => {
      if (chance < elm.chance && !item) item = elm;
    });
  }

  return item;
}

function generateItems() {
  document.querySelector(".list").remove();
  document.querySelector(".scope").innerHTML = `
    <ul class="list"></ul>
  `;

  const list = document.querySelector(".list");

  for (let i = 0; i < cells; i++) {
    const item = getItem();

    const li = document.createElement("li");
    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `
      <img src="${item.img}" alt="" />
    `;

    list.append(li);
  }
}

generateItems();

let isStarted = false;
let isFirstStart = true;

function start() {
  if (isStarted) return;
  else isStarted = true;

  if (!isFirstStart) generateItems();
  else isFirstStart = false;
  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  const item = list.querySelectorAll("li")[15];

  list.addEventListener(
    "transitionend",
    () => {
      isStarted = false;
      item.classList.add("active");
      const data = JSON.parse(item.getAttribute("data-item"));

      console.log(data);
    },
    { once: true }
  );
}
