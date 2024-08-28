const service_description_container=document.getElementById('service-description');
const service_popup=document.getElementById('service-details');
const service_name_container=document.getElementById('service-name-container');
const services=["L'électricité générale", "La fibre optique", "Photovoltaïque"];
let service="";
// ----------
const dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
// ----------

function openServiceDetails(service_id){

    service=services[service_id];
    service_name_container.textContent=service;
  
    service_popup.classList.remove("inactive");
    service_popup.classList.add("active");
    document.documentElement.style.overflow = 'hidden';
}
  
function closeServiceDetails(){
    service_popup.classList.add("inactive");
    service_popup.classList.remove("active");
    document.documentElement.style.overflow = 'auto';
  }

  
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function sendMail(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;

    if(name=='' || email=='' || phone==''){
        Swal.fire({
            text: "Le nom, l'email et le numéro de téléphone sont obligatoires!",
            icon: "warning"
          }); 
          return;
    }
    if(!isPhoneNumberValid(phone) || !isEmailValid(email)){
        Swal.fire({
            text: "Merci de renseigner des informations valides!",
            icon: "warning"
          }); 
          return;
    }

    const mailContent=`
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: orange;">Demande de rendez-vous</h2>
        <p><strong>Le service souhaitée :</strong> ${service}</p>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Numéro de téléphone :</strong> ${phone}</p>
        <p><strong>Date de rendez-vous souhaitée :</strong> ${date}</p>
    </body>
    </html>
    `;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "driss.portfolio@gmail.com",
        Password : "954A84774653B98F2FCB38ED07CE2DA06753",
        To : 'driss.benkhaldoun@gmail.com',
        From : "benkhaldoun.driss@gmail.com",
        Subject : "Demande de rendez-vous",
        Body : mailContent
      }).then(
        message => {
          if(message=="OK"){
            Swal.fire({
              text: "votre demande a été prise en charge",
              icon: "success"
            });
            closeServiceDetails();
          }
          else{
            Swal.fire({
              text: "Désolé, quelque chose s'est mal passé",
              icon: "warning"
            });        
          }
        }
        );
}

function isPhoneNumberValid(phoneNumber) {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}