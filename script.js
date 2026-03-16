async function generateProposal() {
    const { jsPDF } = window.jspdf;

    const client = document.getElementById("clientName").value;
    const projectTitle = document.getElementById("projectTitle").value;
    const instruction = document.getElementById("instruction").value;
    const price = parseFloat(document.getElementById("pricingTier").value).toLocaleString('en-PG', {style: 'currency', currency: 'PGK'});
    const proposalNumber = document.getElementById("proposalNumber").value;
    const proposalDate = document.getElementById("proposalDate").value;

    document.getElementById("status").innerText = "Generating proposal, please wait...";

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a professional proposal writer for PNG organizations. Return JSON with projectDetails, scope, timeline, terms, additionalNotes." },
                { role: "user", content: `Generate a full proposal from this instruction: "${instruction}"` }
            ],
            temperature: 0.7
        })
    });

    const data = await response.json();
    let aiText = data.choices[0].message.content;

    let proposalData;
    try { proposalData = JSON.parse(aiText); } 
    catch(e) { alert("AI response invalid JSON:\n" + aiText); return; }

    const doc = new jsPDF();
    let y = 60;

    // Add logo
    let logoPath = "logos/" + client + ".png";
    let img = new Image();
    img.src = logoPath;
    img.crossOrigin = "Anonymous";

    img.onload = () => { addLogoAndContent(doc, img); }
    img.onerror = () => {
        let defaultLogo = new Image();
        defaultLogo.src = "logos/DefaultLogo.png";
        defaultLogo.crossOrigin = "Anonymous";
        defaultLogo.onload = () => addLogoAndContent(doc, defaultLogo);
        defaultLogo.onerror = () => addContent(doc);
    }

    function addLogoAndContent(doc, imgObj) {
        doc.addImage(imgObj, 'PNG', 150, 10, 40, 40);
        addContent(doc);
    }

    function addContent(doc) {
        doc.setFont("Helvetica","bold");
        doc.setFontSize(24);
        doc.text("PROJECT PROPOSAL", 20, y); y += 15;

        doc.setFont("Helvetica","normal");
        doc.setFontSize(12);
        doc.text("Proposal Number: " + proposalNumber, 20, y); y+=10;
        doc.text("Date: " + proposalDate, 20, y); y+=10;
        doc.text("Client: " + client, 20, y); y+=10;
        doc.text("Project Title: " + projectTitle, 20, y); y+=15;

        function addSection(title, content) {
            doc.setFont("Helvetica","bold"); doc.text(title, 20, y); y+=8;
            doc.setFont("Helvetica","normal");
            let splitText = doc.splitTextToSize(content, 170);
            doc.text(splitText, 20, y); 
            y += splitText.length * 10 + 5;
        }

        addSection("Project Details:", proposalData.projectDetails);
        addSection("Scope of Work:", proposalData.scope);
        addSection("Timeline:", proposalData.timeline);
        addSection("Terms & Conditions:", proposalData.terms);
        if(proposalData.additionalNotes && proposalData.additionalNotes.trim() !== "")
            addSection("Additional Notes / Research Info:", proposalData.additionalNotes);

        doc.setFont("Helvetica","bold");
        doc.setFontSize(14);
        doc.text("Total Price: " + price, 20, y+10);

        doc.save("Proposal-" + client + ".pdf");
        document.getElementById("status").innerText = "Proposal generated successfully!";
    }
}
