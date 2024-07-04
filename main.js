import './main.css';

const input = document.getElementById("input");
const submit = document.getElementById("submit");
const section = document.querySelector("section");

submit.addEventListener("click", AddData);

document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        AddData();
    }
});

// Load data from localStorage on page load
document.addEventListener("DOMContentLoaded", loadData);

function AddData() {
    let txt = input.value.trim();
    if (txt === ''){
        alert("Add text");
        return;
    }

    let data = createDataElement(txt);
    section.prepend(data);
    input.value = '';

    saveData();
}

function createDataElement(txt) {
    let data = document.createElement('div');
    data.innerHTML = `
        <div class="list flex justify-between text-[25px] rounded-2xl px-1 max-h-[70px]">
            <div class="form-control">
                <label class="cursor-pointer label flex gap-6">
                    <input type="checkbox" class="checkbox checkbox-success self-center" />
                    <span class="data text-lg">${txt}</span>
                </label>
            </div>
            <div class="flex items-center gap-2">
                <button class="edit btn btn-sm btn-outline btn-info">Edit</button>
                <i class="delete fa-regular fa-circle-xmark self-center cursor-pointer hover:text-red-700"></i>
            </div>
        </div>`;
    
    data.querySelector(".delete").addEventListener("click", () => {
        data.remove();
        saveData();
    });

    let isEditing = false;
    data.querySelector(".edit").addEventListener("click", () => {
        const textSpan = data.querySelector(".data");
        if (isEditing) {
            textSpan.contentEditable = "false";
            data.querySelector(".edit").setAttribute("class","edit btn btn-sm btn-outline btn-info");
            data.querySelector(".edit").textContent = "Edit";
        } else {
            textSpan.contentEditable = "true";
            textSpan.focus();
            document.execCommand('selectAll', false, null);
            data.querySelector(".edit").setAttribute("class","edit btn btn-sm btn-outline btn-success");
            data.querySelector(".edit").textContent = "Save";
        }
        isEditing = !isEditing;
        saveData();
    });

    data.querySelector(".checkbox").addEventListener("change", () => {
        saveData();
    });

    return data;
}

function saveData() {
    const dataElements = section.querySelectorAll(".list");
    const dataArray = [];
    dataElements.forEach(dataElement => {
        const text = dataElement.querySelector(".data").textContent;
        const isChecked = dataElement.querySelector(".checkbox").checked;
        dataArray.push({ text, isChecked });
    });
    localStorage.setItem("todoData", JSON.stringify(dataArray));
}

function loadData() {
    const savedData = JSON.parse(localStorage.getItem("todoData"));
    if (savedData) {
        savedData.forEach(item => {
            const data = createDataElement(item.text);
            section.append(data);
            if (item.isChecked) {
                data.querySelector(".checkbox").checked = true;
            }
        });
    }
}
