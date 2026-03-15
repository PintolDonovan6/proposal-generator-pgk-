function generatePDF(){

const { jsPDF } = window.jspdf;

let client = document.getElementById("clientName").value;
let project = document.getElementById("projectDetails").value;
let price = document.getElementById("pricingTier").value;

let scope = document.getElementById("scope").value;
let timeline = document.getElementById("timeline").value;
let terms = document.getElementById("terms").value;

let doc = new jsPDF();

doc.setFont("Helvetica","bold");
doc.setFontSize(22);
doc.text("PROJECT PROPOSAL",20,20);

doc.setFont("Helvetica","normal");
doc.setFontSize(12);

doc.text("Client:",20,40);
doc.text(client,60,40);

doc.text("Project Details:",20,55);
doc.text(project,20,65);

doc.text("Scope of Work:",20,90);
doc.text(scope,20,100);

doc.text("Timeline:",20,125);
doc.text(timeline,20,135);

doc.text("Terms & Conditions:",20,160);
doc.text(terms,20,170);

doc.setFont("Helvetica","bold");
doc.setFontSize(14);
doc.text("Total Price: PGK " + price,20,200);

doc.save("proposal-"+client+".pdf");

}
