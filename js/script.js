// fetch-all-data
const fetchAllData = async (category) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy${
        category ? `/category/${category}` : "/pets"
      }`
    );

    if (!res.ok) {
      throw new Error(`HTTP Error! status : ${res.status}`);
    }

    const data = await res.json();
    if (category) {
      displayAllData(data.data);
    } else {
      displayAllData(data.pets);
    }
  } catch (error) {
    console.error("Fetch Error :", error);
  }
};

// fetch-data-for-dynamic-btn
const fetchBtnData = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/categories`
    );

    if (!res.ok) {
      throw new Error(`HTTP Error! status :${res.status}`);
    }

    const data = await res.json();
    displayBtnData(data.categories);
  } catch (error) {
    console.error("Fetch Error :", error);
  }
};

// display-button-data
const displayBtnData = (data) => {
  const btnContainer = document.getElementById("btnContainer");
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick="categoryBtnClickHandler('${element.category}','${element.id}')" id="btn-${element.id}" class="categoryBtn py-4 px-6 rounded-3xl bg-white border-2">
                    <p class="flex items-center gap-5">
                        <img class="w-10 h-10" src=${element.category_icon} alt="">
                        <span class="text-xl font-bold">${element.category}</span>
                    </p>
                </button>
        `;
    btnContainer.appendChild(div);
  });
};

// store-data-index-in-array
let storeData = [];
// global-variables
const cardContainer = document.getElementById("cardContainer");
const spinContainer = document.getElementById("spinContainer");

// display-data-function
const displayAllData = (data) => {
  storeData = data;
  cardContainer.innerHTML = "";
  if (data.length === 0) {
    spinContainer.classList.add("hidden");
    cardContainer.classList.remove("grid");
    const div = document.createElement("div");
    div.innerHTML = `
       <div class="flex flex-col items-center justify-center gap-5">
        <img src="./images/error.webp" alt="error">
        <h3 class="text-3xl font-bold text-red-600">No Information Available</h3>
      </div>
      `;
    cardContainer.appendChild(div);
  } else {
    cardContainer.classList.add("grid");
    spinContainer.classList.add("hidden");

    data.forEach((element, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
             <div class="card max-w-[400px] shadow-xl">
                            <figure class="px-10 pt-10">
                              <img
                                src=${element.image}
                                class="rounded-xl" />
                            </figure>
                            <div class="card-body">
                              <h2 class="text-3xl font-black"> 
                              ${element.pet_name}</h2>
                              <p class="text-secondary font-semibold"><i class="fa-solid fa-puzzle-piece"></i> 
                              ${
                                element.breed ? element.breed : "Not Available"
                              }</p>
                              <p class="text-secondary font-semibold"><i class="fa-solid fa-calendar-days"></i>
                               ${
                                 element.date_of_birth
                                   ? element.date_of_birth
                                   : "Not Available"
                               }</p>
                              <p class="text-secondary font-semibold"><i class="fa-solid fa-transgender"></i> 
                              ${
                                element.gender
                                  ? element.gender
                                  : "Not Available"
                              }</p>
                              <p class="text-secondary font-semibold"><i class="fa-solid fa-hand-holding-dollar"></i>
                               ${
                                 element.price ? element.price : "Not Available"
                               }</p>
                              <div class="flex items-center  justify-between pt-2">
                                <button class="btn" onclick="likeClickHandler('${
                                  element.image
                                }')"><i class="fa-regular fa-thumbs-up text-xl"></i></button>
                                <button onclick="adoptClickHandler(this)" class="adoptBtn btn text-highlight text-lg font-semibold">Adopt</button>
                                <button onclick="detailClickHandler('${index}')" 
                                class="btn text-highlight text-lg font-semibold">Details</button>
                              </div>
                            </div>
                          </div>
            `;

      cardContainer.appendChild(div);
    });
  }
};

// Category-wise-data-fetching
const categoryBtnClickHandler = (category, id) => {
  const categoryButton = document.getElementById(`btn-${id}`);

  activeButton();

  categoryButton.classList.add("bg-secondary", "text-white");
  spinContainer.classList.remove("hidden");
  cardContainer.innerHTML = "";

  setTimeout(() => {
    fetchAllData(category);
  }, 2000);
};

// remove-style-form-buttons
const activeButton = () => {
  const buttons = document.getElementsByClassName("categoryBtn");
  for (let button of buttons) {
    button.classList.remove("bg-secondary", "text-white");
  }
};

// card-like-button-clickHandler
const likeClickHandler = async (image) => {
  const imageContainer = document.getElementById("imageContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="w-28 h-28 rounded-xl p-1">
                        <img class="w-full h-full object-cover rounded-xl" src=${image} alt="">
                    </div>
    `;
  imageContainer.appendChild(div);
};

// details-button-clickHandler

const detailClickHandler = (index) => {
  const element = storeData[index];
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card max-w-[400px] shadow-xl">
                        <figure class="px-10 pt-10">
                          <img
                            src=${element.image}
                            class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                          <h2 class="text-3xl font-black"> 
                          ${element.pet_name}</h2>
                          <p class="text-secondary font-semibold"><i class="fa-solid fa-puzzle-piece"></i> 
                          ${element.breed ? element.breed : "Not Available"}</p>
                          <p class="text-secondary font-semibold"><i class="fa-solid fa-calendar-days"></i>
                           ${
                             element.date_of_birth
                               ? element.date_of_birth
                               : "Not Available"
                           }</p>
                          <p class="text-secondary font-semibold"><i class="fa-solid fa-transgender"></i> 
                          ${
                            element.gender ? element.gender : "Not Available"
                          }</p>
                          <p class="text-secondary font-semibold"><i class="fa-solid fa-hand-holding-dollar"></i>
                           ${
                             element.price ? element.price : "Not Available"
                           }</p>
                           <div>
                           <h3 class="text-3xl font-bold text-primary my-2">Details Information</h3>
                           <p class="font-semibold text-secondary">${
                             element.pet_details
                           }</p>
                           </div>
                           <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn bg-highlight hover:text-highlight font-bold text-white">Close</button>
                  </form>
                </div>
                        </div>
                      </div>
    `;
  modalContainer.append(div);
  my_modal_5.showModal();
};

//adopt-click-handler

const adoptClickHandler = (button) => {
  const countDown = document.getElementById("countDown");
  // countdown-for-adopt-button
  countDown.textContent = "";
  let count = 4;
  const interId = setInterval(() => {
    count--;
    countDown.textContent = count;
    if (count == 0) {
      clearInterval(interId);
      countDown.textContent = "Done";
      // disabled-button
      button.disabled = true;
      // changed-button-textContent
      button.textContent = "Adopted";
      adoptModal.close();
    }
  }, 1000);
  adoptModal.showModal();
};

// sortedData-function
const sortedData = () => {
  const sortedData = [...storeData].sort((a, b) => {
    const priceA = a.price ? parseFloat(a.price) : 0;
    const priceB = b.price ? parseFloat(b.price) : 0;
    return priceB - priceA;
  });
  spinContainer.classList.remove("hidden");
  cardContainer.innerHTML = "";
  setTimeout(() => {
    displayAllData(sortedData);
  }, 2000);
};
fetchBtnData();
fetchAllData();
