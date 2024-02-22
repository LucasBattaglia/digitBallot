document.querySelector(".more").style.display = "none";
document.querySelector("#toggleButton").textContent = "+";
document.getElementById("toggleButton").addEventListener("click", function() {

    var moreElement = document.querySelector(".more");
    var boutonElement = document.querySelector("#toggleButton");

    if (moreElement.style.display === "none") {
        moreElement.style.display = "flex";
        boutonElement.textContent = "-";
    } else {
        moreElement.style.display = "none";
        boutonElement.textContent = "+";
    }
});


document.getElementById('impr').addEventListener("click", function(){
    window.print();
});