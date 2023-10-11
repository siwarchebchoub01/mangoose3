const express = require('express');
const mongoose = require('mongoose');

const port =  3000; 
const connectdb=require('./config/connect')
const User=require('./modele/user')
require('dotenv').config({path:'./config/.env'})
const app = express();





//CREACTION DU SERVEUR QUI CONTIENT LES DETAILS DE CHAQUE PERSONNE
const create = async () => {
  try {
      const arrayOfPeople = [
          { name: "John", age: 50, favoriteFoods: ["burritos"] },
          { name: "Mary", age: 12, favoriteFoods: ["burritos", "pizza"] },
          { name: "Jane", age: 15, favoriteFoods: [] } // Changed "Mary" to "Jane"
      ];

      // Use User.insertMany() to insert the array of objects
      const users = await User.insertMany(arrayOfPeople);

      console.log("Users created successfully:", users);
  } catch (error) {
      console.error("Error creating users:", error);
  }
};
//TROUVER TOUTES LES PERSONNES PORTANT LE NOM SPÉCIFIÉ
const findPeopleByName1=async()=>{
  try {
    // Use Model.find() to find all people with the specified name
    const users = await User.find({ name:"John" });

    console.log(users);
  } catch (error) {
    console.error('Error searching for people:', error);

  }
}
//TROUVER UN SEUL PERSONNE PORTANT LE NOM SPÉCIFIÉ
const findPeopleByName=async()=>{
  try {
    // Use Model.find() to find all people with the specified name
    const users = await User.findOne({ name:"John" });

    console.log(users);
  } catch (error) {
    console.error('Error searching for people:', error);

  }
}
//TROUVER UNE SEULE PERSONNE QUI A UN CERTAIN ALIMENT DANS SES FAVORIS
async function findPersonByFavoriteFood() {
  try {
    // Use Model.findOne() to find a person with the specified favorite food
    const person = await User.findOne({ favoriteFoods: "burritos" });

   console.log(person);
  } catch (error) {
    console.error('Error searching for a person:', error);
    return null; // Return null in case of an error
  }
}
//TROUVER LA (SEULE !!) PERSONNE AYANT UN _ID DONNÉ
async function findPersonById(personId) {
  try {
    // Use Model.findById() to find a person by _id
    const person = await User.findById(personId);

    console.log(person);
  } catch (error) {
    console.error('Error searching for a person by _id:', error);
     
  }
}
//RECHERCHEZ UNE PERSONNE PAR _ID AVEC LE PARAMÈTRE PERSON ID COMME CLÉ DE RECHERCHE. AJOUTER « HAMBURGER » À LA LISTE DES ALIMENTS PRÉFÉRÉS DE LA PERSONNE

async function addFavoriteFoodToPerson(personId, favoriteFood) {
  try {
    const person = await User.findByIdAndUpdate(
      personId,
      { $push: { favoriteFoods: favoriteFood } },
      { new: true }
    );

 
    console.log('Favorite food "hamburger" added to the person:', person);
  } catch (error) {
    console.error('Error updating person:', error);
  }
}
const personId = '651b552365e8001a9a36d448'; 
const favoriteFood = 'hamburger';
//RECHERCHEZ UNE PERSONNE PAR NOM ET DÉFINISSEZ SON ÂGE SUR 20 ANS.

async function updatePersonAge(personName) {
  try {
    const updatedPerson = await User.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true } // This option ensures that the updated document is returned
    );

    

    console.log('Updated person:', updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
  }
}
const personNameToUpdate = 'John';

//SUPPRIMEZ UNE PERSONNE PAR SON _ID.
async function deletePersonById(personId) {
  try {
    const deletedPerson = await User.findByIdAndRemove(personId);

    console.log('Deleted person:', deletedPerson);
  } catch (error) {
    console.error('Error deleting person:', error);
  }
}
const personIdToDelete = '651b552365e8001a9a36d448';


//SUPPRIMER TOUTES LES PERSONNES DONT LE NOM EST « MARIE »
async function deletePeopleByName(name) {
  try {
    const result = await User.deleteMany({ name: name });

    console.log(`Deleted ${result.deletedCount} people named ${name}`);
  } catch (error) {
    console.error('Error deleting people:', error);
  }
}

 //TROUVEZ DES GENS QUI AIMENT LES BURRITOS. TRIEZ-LES PAR NOM, LIMITEZ LES RÉSULTATS À DEUX DOCUMENTS ET MASQUEZ LEUR ÂGE.
 
async function searchPeopleWhoLikeBurritos() {
  try {
    const data = await User.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec((err, user2) => {
        if (err) return handleError(err);
        console.log(user2);
      })

    console.log('Result:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

 












 
 















// Call the create function to insert the users into the database
//create();
//findPeopleByName1()
//findPeopleByName()
//findPersonByFavoriteFood()
//findPersonById("651b552365e8001a9a36d448")
//addFavoriteFoodToPerson(personId, favoriteFood);
//updatePersonAge(personNameToUpdate)
//deletePersonById(personIdToDelete);
//deletePeopleByName('Mary');
searchPeopleWhoLikeBurritos();
 

connectdb()
app.listen(port,(err)=>{err?console.log(err):console.log("server running");})