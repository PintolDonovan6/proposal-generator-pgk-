function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Gather all form data
    let proposalNumber = document.getElementById("proposalNumber").value;
    let proposalDate = document.getElementById("proposalDate").value;
    let client = document.getElementById("clientName").value;
    let projectTitle = document.getElementById("projectTitle").value;
    let projectDetails = document.getElementById("projectDetails").value;
    let price = parseFloat(document.getElementById("pricingTier").value).toLocaleString('en-PG', {style: 'currency', currency: 'PGK'});
    let scope = document.getElementById("scope").value;
    let timeline = document.getElementById("timeline").value;
    let terms = document.getElementById("terms").value;
    let additional = document.getElementById("additional").value;

    let doc = new jsPDF();

    // Add Proposal Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text("PROJECT PROPOSAL", 20, 20);

    // Proposal metadata
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text("Proposal Number: " + proposalNumber, 20, 35);
    doc.text("Date: " + proposalDate, 20, 45);
    doc.text("Client: " + client, 20, 55);
    doc.text("Project Title: " + projectTitle, 20, 65);

    let y = 75; // Starting Y for project sections

    // Function to handle multi-line text
    function addSection(title, content) {
        doc.setFont("Helvetica", "bold");
        doc.text(title, 20, y);
        y += 10;
        doc.setFont("Helvetica", "normal");
        let splitText = doc.splitTextToSize(content, 170);
        doc.text(splitText, 20, y);
        y += splitText.length * 10 + 5;
    }

    addSection("Project Details:", projectDetails);
    addSection("Scope of Work:", scope);
    addSection("Timeline:", timeline);
    addSection("Terms & Conditions:", terms);
    if(additional.trim() !== "") addSection("Additional Notes / Research Info:", additional);

    // Total Price
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Total Price: " + price, 20, y + 10);

    // Save PDF
    doc.save("Proposal-" + client + ".pdf");
}
