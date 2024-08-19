document.addEventListener("DOMContentLoaded", () => {
   const modal = document.querySelector(".formulaire");
   document.getElementById("boutonAjouterDepense").addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.style.display = "block";
   });

   document.getElementById("closeModal").addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.style.display = "none";
   });

   const validerDepenses = document.querySelector(".validerDepenses");
   validerDepenses.addEventListener("click", () => {
      const titreDepense = document.querySelector(".titreDepenses").value;
      const montantDepense = parseFloat(document.querySelector(".montantDepense").value);
      addExpenseToTable(titreDepense, montantDepense, ".tableDep tbody");

      // Réinitialiser le formulaire
      document.querySelector(".titreDepenses").value = "";
      document.querySelector(".montantDepense").value = "";

      // Fermer le modal après l'ajout
      modal.classList.add("hidden");
      modal.style.display = "none";

      // Calculer le montant total des dépenses
      let calculDesMontantDeDepense = parseFloat(document.getElementById("totalDepense").textContent) || 0;
      calculDesMontantDeDepense += montantDepense;
      document.getElementById("totalDepense").textContent = calculDesMontantDeDepense.toFixed(2);
      miseAJourSolde()
   });

   function addExpenseToTable(titreDepense, montantDepense, classTbody) {
      const tbody = document.querySelector(classTbody);
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
         <td>${titreDepense}</td>
         <td class=" deleteMontantDesDepense">${montantDepense.toFixed(2)}</td>
         <td><button class="deleteButton" style="background-color:red; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px;">Supprimer</button></td>`;
      tbody.insertAdjacentElement("afterbegin", newRow);

      // Bouton supprimer
      const deleteButton = newRow.querySelector(".deleteButton");
      deleteButton.addEventListener("click", () => {
         const rowDelete = deleteButton.closest("tr");
         rowDelete.remove();

         const deleteMontantDesDepense=parseFloat(rowDelete.querySelector(".deleteMontantDesDepense").textContent);
         let montantTotalDesDepense=parseFloat( document.getElementById("totalDepense").textContent);
            montantTotalDesDepense -= deleteMontantDesDepense;
            document.getElementById("totalDepense").textContent=montantTotalDesDepense.toFixed(2)
            miseAJourSolde()
      });
   }

   // Partie revenus

   const modal2 = document.querySelector(".formulaire2");
   document.getElementById("boutonAjouterRevenus").addEventListener("click", (event) => {
      event.preventDefault();
      modal2.classList.remove("hidden");
      modal2.style.display = "block";
   });

   document.getElementById("closeModal2").addEventListener("click", () => {
      modal2.classList.add("hidden");
      modal2.style.display = "none";
   });

   const validerRevenu = document.querySelector(".validerRevenu");
   validerRevenu.addEventListener("click", () => {
      const titreRevenu = document.querySelector(".titreRevenu").value;
      const montantRevenu = parseFloat(document.querySelector(".montantRevenu").value);

      addIncomeToTable(titreRevenu, montantRevenu, ".tableRev tbody");

      // Fermer le modal après l'ajout
      modal2.classList.add("hidden");
      modal2.style.display = "none";


      //________________________________________________________________________________

      //calculer le montant total des revenus
      let calculDesMontantDesRevenu2 = parseFloat(document.getElementById("totalRevenu").textContent) || 0;
      calculDesMontantDesRevenu2 += montantRevenu;
      document.getElementById("totalRevenu").textContent = calculDesMontantDesRevenu2.toFixed(2);
      miseAJourSolde()
   });

      // Réinitialiser les valeurs
      document.querySelector(".titreRevenu").value = "";
      document.querySelector(".montantRevenu").value = "";
   });

   function addIncomeToTable(titreRevenu, montantRevenu) {
      const tbody = document.getElementById("tbodyrev");
      const newRow2 = document.createElement("tr");
      newRow2.innerHTML = `
         <td>${titreRevenu}</td>
         <td class=" deleteMontantRevenu ">${montantRevenu.toFixed(2)}</td>
         <td><button class="deleteButton2" style="background-color:red; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px;">Supprimer</button></td>`;
      tbody.insertAdjacentElement("afterbegin", newRow2);

      const deleteButton2 = newRow2.querySelector(".deleteButton2");
      deleteButton2.addEventListener("click", () => {
         const rowDelete2 = deleteButton2.closest("tr");
         rowDelete2.remove();
         const deleteMontantRevenu=parseFloat(rowDelete2.querySelector(".deleteMontantRevenu").textContent);
         let montantTotalRevenu=parseFloat( document.getElementById("totalRevenu").textContent);
            montantTotalRevenu -= deleteMontantRevenu;
            document.getElementById("totalRevenu").textContent=montantTotalRevenu.toFixed(2)
            miseAJourSolde()
      });
   }
//_________________________________________________________________________________________________

//calcul solde
function miseAJourSolde(){
const montantdesdepense = parseFloat(document.getElementById("totalDepense").textContent) || 0 ;
const montantdesRevenu =parseFloat(document.getElementById("totalRevenu").textContent) || 0 ;
const solde = montantdesRevenu - montantdesdepense;
document.getElementById("Solde").textContent = solde. toFixed(2);
}