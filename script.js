function generatePDF(){

const { jsPDF } = window.jspdf;

let client = document.getElementById("clientName").value;
let project = document.getElementById("projectDetails").value;
let price = document.getElementById("pricingTier").value;

let doc = new jsPDF();

doc.setFontSize(20);
doc.text("Project Proposal",20,20);

doc.setFontSize(12);

doc.text("Client: " + client,20,40);
doc.text("Project Details:",20,60);
doc.text(project,20,70);

doc.text("Price: PGK " + price,20,110);

doc.save("proposal-"+client+".pdf");

}
