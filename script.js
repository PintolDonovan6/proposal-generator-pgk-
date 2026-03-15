function generatePDF(){

    const { jsPDF } = window.jspdf;

    let client = document.getElementById("clientName").value;
    let project = document.getElementById("projectDetails").value;
    let price = document.getElementById("pricingTier").value;

    let scope = document.getElementById("scope").value;
    let timeline = document.getElementById("timeline").value;
    let terms = document.getElementById("terms").value;

    let doc = new jsPDF();

    // Title
    doc.setFont("Helvetica","bold");
    doc.setFontSize(22);
    doc.text("PROJECT PROPOSAL",20,20);

    doc.setFont("Helvetica","normal");
    doc.setFontSize(12);

    // Client
    doc.text("Client:",20,40);
    doc.text(client,60,40);

    // Project Details
    doc.text("Project Details:",20,55);
    doc.text(project,20,65);

    // Scope
    doc.text("Scope of Work:",20,90);
    doc.text(scope,20,100);

    // Timeline
    doc.text("Timeline:",20,125);
    doc.text(timeline,20,135);

    // Terms
    doc.text("Terms & Conditions:",20,160);
    doc.text(terms,20,170);

    // Price
    doc.setFont("Helvetica","bold");
    doc.setFontSize(14);
    doc.text("Total Price: PGK " + price,20,200);

    // Save PDF
    doc.save("proposal-"+client+".pdf");
}
