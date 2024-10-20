document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterDiv = document.getElementById('create-monster');
    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');
    let page = 1; 
    const limit = 50; 
  
    // Function to load monsters 
    function loadMonsters(page, limit) {
      fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            // Clear the container
          monsterContainer.innerHTML = ''; 
          monsters.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
              <h2>${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv);
          });
        })
        .catch(error => console.error('Error fetching monsters:', error));
    }
  
    // To load initial monsters when the page loads
    loadMonsters(page, limit);
  
    // Creating form to add a new monster
    function createMonsterForm() {
      const form = document.createElement('form');
      form.innerHTML = `
        <input type="text" id="name" placeholder="Name" required>
        <input type="number" id="age" placeholder="Age" required>
        <input type="text" id="description" placeholder="Description" required>
        <button type="submit">Create Monster</button>
      `;
      createMonsterDiv.appendChild(form);
  
      // Handle form submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const description = document.getElementById('description').value;
  
        const newMonster = {
          name: name,
          age: parseFloat(age),
          description: description
        };
  
        // POST request to create a new monster
        fetch('http://localhost:3000/monsters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newMonster)
        })
          .then(response => response.json())
          .then(monster => {
            // Add the newly created monster to the list
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
              <h2>${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv);
  
            // Clear form fields
            form.reset();
          })
          .catch(error => console.error('Error creating monster:', error));
      });
    }
  
    // Create the monster form on page load
    createMonsterForm();
  
    // Pagination button logic
    forwardBtn.addEventListener('click', () => {
      page++;
      loadMonsters(page, limit);
    });
  
    backBtn.addEventListener('click', () => {
      if (page > 1) {
        page--;
        loadMonsters(page, limit);
      }
    });
  });
  