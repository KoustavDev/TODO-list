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

function AddData() {
    let txt = input.value.trim();
    if (txt === ''){
        alert("Add text");
        return;
    }

    let data = document.createElement('div');
    data.innerHTML = `
        <div class="list flex justify-between text-[25px] rounded-2xl px-1 max-h-[70px]">
            <div class="form-control">
                <label class="cursor-pointer label flex gap-6">
                    <input type="checkbox" id="check" class="checkbox checkbox-success self-center" />
                    <span class="data text-lg">${txt}</span>
                </label>
            </div>
            <div class="flex items-center gap-2">
                <button class="edit btn btn-sm btn-outline btn-info">Edit</button>
                <i class="delete fa-regular fa-circle-xmark self-center cursor-pointer hover:text-red-700"></i>
            </div>
        </div>`;
    
    section.prepend(data);
    input.value = '';

    data.querySelector(".delete").addEventListener("click", () => {
        data.remove();
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
            // Select all text inside the span
            document.execCommand('selectAll', false, null);
            data.querySelector(".edit").setAttribute("class","edit btn btn-sm btn-outline btn-success");
            data.querySelector(".edit").textContent = "Save";
        }
        isEditing = !isEditing;
    });
}
