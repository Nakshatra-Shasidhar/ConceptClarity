document.getElementById("explainBtn").addEventListener("click", function() {
    let term = document.getElementById("termInput").value;

    fetch("/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ term: term })
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById("result").innerText = data.explanation;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Oops! Something went wrong.";
    });
});

