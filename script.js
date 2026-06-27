let students=[];
function addStudent() {
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let branch = document.getElementById("studentBranch").value;
    let rows=document.querySelectorAll("#studentTable tr");
    for(let i=0;i<rows.length;i++){
        if(rows[i].cells[0].innerHTML===id){
            alert("Students ID already exists!");
            return ;
        }
    }

    if (id === "" || name === "" || branch === "") {
        alert("Please fill all fields");
        return;
    }
    let table = document.getElementById("studentTable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = id;
    row.insertCell(1).innerHTML = name;
    row.insertCell(2).innerHTML = branch;
    let deletecell=row.insertCell(3);
    deletecell.innerHTML=
    '<button onClick="editStudent(this)">Edit</button>'+
    '<button onClick="deleteStudent(this)">Delete</button>';
    students.push({
        id:id,
        name:name,
        branch:branch
    });
    localStorage.setItem("students",JSON.stringify(students));
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentBranch").value = "";
    updateStudentCount();
    updateBranchCount();
}
function deleteStudent(button){
    let row=button.parentNode.parentNode;
    row.remove();
    updateStudentCount();
    updateBranchCount();
}
function searchStudent() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(function(row) {
        let studentName = row.cells[1].innerHTML.toLowerCase();

        if (studentName.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
function editStudent(button) {
    let row = button.parentNode.parentNode;

    document.getElementById("studentId").value = row.cells[0].innerHTML;
    document.getElementById("studentName").value = row.cells[1].innerHTML;
    document.getElementById("studentBranch").value = row.cells[2].innerHTML;

    row.remove();
}
window.onload = function () {
    let savedStudents = localStorage.getItem("students");

    if (savedStudents) {
        students = JSON.parse(savedStudents);

        students.forEach(student => {
            let table = document.getElementById("studentTable");
            let row = table.insertRow();

            row.insertCell(0).innerHTML = student.id;
            row.insertCell(1).innerHTML = student.name;
            row.insertCell(2).innerHTML = student.branch;

            let actionCell = row.insertCell(3);
            actionCell.innerHTML =
                '<button onclick="editStudent(this)">Edit</button> ' +
                '<button onclick="deleteStudent(this)">Delete</button>';
        });
    }
};
function updateStudentCount() {
    let rows = document.querySelectorAll("#studentTable tr");
    document.getElementById("studentCount").innerHTML = rows.length;
}
function logout(){
    window.location.href="login.html";
}
function showDateTime(){
    let now=new Date();
    document.getElementById("datetime").innerHTML=
    now.toLocaleString();
}
setInterval(showDateTime,1000);
showDateTime();
document.getElementById("welcome").innerHTML="Welcome Admin!";
function updateBranchCount() {
    let rows = document.querySelectorAll("#studentTable tr");

    let cse = 0;
    let csd = 0;
    let csm = 0;

    rows.forEach(row => {
        let branch = row.cells[2].innerHTML.toUpperCase();

        if (branch === "CSE") cse++;
        if (branch === "CSD") csd++;
        if (branch === "CSM") csm++;
    });

    document.getElementById("cseCount").innerHTML = cse;
    document.getElementById("csdCount").innerHTML = csd;
    document.getElementById("csmCount").innerHTML = csm;
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}