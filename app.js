/* ==========================================================================
   ROOMIES - Interactive Logic (JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE NAVIGATION TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking links (mobile)
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. FORM TABS & SUBMISSION LOGIC (On contacto.html)
    const tabEstudiante = document.getElementById('tab-estudiante');
    const tabFamiliar = document.getElementById('tab-familiar');
    const formEstudiante = document.getElementById('form-estudiante');
    const formFamiliar = document.getElementById('form-familiar');
    const formSuccess = document.getElementById('form-success');
    const successMessage = document.getElementById('success-message');
    const btnBackForm = document.getElementById('btn-back-form');

    let currentFormType = 'estudiante'; // Default

    if (tabEstudiante && tabFamiliar && formEstudiante && formFamiliar && formSuccess) {
        // Tab Switchers
        tabEstudiante.addEventListener('click', () => {
            tabEstudiante.classList.add('active');
            tabFamiliar.classList.remove('active');
            formEstudiante.classList.add('active-form');
            formFamiliar.classList.remove('hidden-form');
            formFamiliar.style.display = 'none';
            formEstudiante.style.display = 'flex';
            formSuccess.style.display = 'none';
            currentFormType = 'estudiante';
        });

        tabFamiliar.addEventListener('click', () => {
            tabFamiliar.classList.add('active');
            tabEstudiante.classList.remove('active');
            formFamiliar.classList.add('active-form');
            formEstudiante.classList.remove('active-form');
            formEstudiante.style.display = 'none';
            formFamiliar.style.display = 'flex';
            formSuccess.style.display = 'none';
            currentFormType = 'familiar';
        });

        // Student Form Submit
        formEstudiante.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('est-nombre').value;
            const univ = document.getElementById('est-univ').options[document.getElementById('est-univ').selectedIndex].text;
            
            // Simulating loading
            const submitBtn = document.getElementById('est-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registrando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formEstudiante.style.display = 'none';
                formSuccess.style.display = 'flex';
                successMessage.innerHTML = `¡Hola, <strong>${nombre}</strong>! Tu solicitud para buscar roomie en <strong>${univ}</strong> ha sido pre-registrada. Las co-fundadoras, <strong>Ruth Fernández</strong> o <strong>Ana Hernández</strong>, te contactarán por WhatsApp en las próximas 24 horas para validar tu perfil e iniciar tu búsqueda de roomie ideal.`;
                formEstudiante.reset();
            }, 1000);
        });

        // Parent / Owner Form Submit
        formFamiliar.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('fam-nombre').value;
            const tipo = document.getElementById('fam-tipo').value;
            
            const submitBtn = document.getElementById('fam-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formFamiliar.style.display = 'none';
                formSuccess.style.display = 'flex';
                
                let detailText = "Hemos recibido tu consulta.";
                if (tipo === 'padre') {
                    detailText = "Como padre/madre de familia, sabemos que la seguridad es lo primero. Te enviaremos información detallada sobre nuestros estrictos filtros de identidad y validación física.";
                } else if (tipo === 'dueno') {
                    detailText = "Nos pondremos en contacto para coordinar la inspección de tu inmueble e incluirlo en nuestra base de datos verificada para estudiantes en Comayagua.";
                }
                
                successMessage.innerHTML = `¡Gracias, <strong>${nombre}</strong>! ${detailText} Te responderemos por correo o WhatsApp a la brevedad.`;
                formFamiliar.reset();
            }, 1000);
        });

        // Back Button on Success Card
        btnBackForm.addEventListener('click', () => {
            formSuccess.style.display = 'none';
            if (currentFormType === 'estudiante') {
                formEstudiante.style.display = 'flex';
            } else {
                formFamiliar.style.display = 'flex';
            }
        });
    }

    // 3. ROOMATE MATCH ALGORITHM & SIMULATOR (On simulador.html)
    // Mock Roommate Profiles Database (Featuring Custom SVG Avatars)
    const roommatesData = [
        {
            name: "Sofía Torres",
            age: 19,
            university: "UNAH-CURC",
            gender: "femenino",
            cleanliness: 3, // Minucioso
            noise: 1,       // Silencioso
            horario: "diurno",
            mascota: "no",
            budget: 3200,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#FDE2E4"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#E76F51" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="40" r="18" fill="#F8AD9D"/><circle cx="50" cy="40" r="15" fill="#FFD166"/><path d="M32 35C32 20 68 20 68 35C68 37 65 35 50 35C35 35 32 37 32 35Z" fill="#3D2E28"/><circle cx="43" cy="38" r="4" stroke="#3D2E28" stroke-width="2"/><circle cx="57" cy="38" r="4" stroke="#3D2E28" stroke-width="2"/><path d="M47 38H53" stroke="#3D2E28" stroke-width="2"/><path d="M47 48C47 48 50 51 53 48" stroke="#3D2E28" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Medicina", "Estudio Prioritario", "No fuma", "Café lover"],
            verified: true
        },
        {
            name: "Mateo Rivera",
            age: 21,
            university: "UJCV",
            gender: "masculino",
            cleanliness: 2, // Ordenado
            noise: 2,       // Moderado
            horario: "diurno",
            mascota: "si",
            budget: 4500,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#E8F1F2"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#2A9D8F" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="40" r="18" fill="#E9C46A"/><path d="M35 30C40 22 60 22 65 30L62 35L38 35Z" fill="#4A3B32"/><circle cx="43" cy="40" r="2" fill="#4A3B32"/><circle cx="57" cy="40" r="2" fill="#4A3B32"/><path d="M46 47C48 49 52 49 54 47" stroke="#4A3B32" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Ingeniería Civil", "Pet friendly", "Deportista", "Cocina bien"],
            verified: true
        },
        {
            name: "Valentina Ortiz",
            age: 18,
            university: "UNAH-CURC",
            gender: "femenino",
            cleanliness: 3, // Minucioso
            noise: 2,       // Moderado
            horario: "nocturno",
            mascota: "si",
            budget: 3000,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#FFF2E6"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#F4A261" stroke-width="6" stroke-linecap="round"/><circle cx="34" cy="38" r="8" fill="#5C4D3C"/><circle cx="66" cy="38" r="8" fill="#5C4D3C"/><circle cx="50" cy="24" r="10" fill="#5C4D3C"/><circle cx="50" cy="40" r="18" fill="#E9C46A"/><circle cx="43" cy="40" r="2" fill="#5C4D3C"/><circle cx="57" cy="40" r="2" fill="#5C4D3C"/><path d="M45 47C47 50 53 50 55 47" stroke="#5C4D3C" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Administración", "Vegetariana", "Gatos", "Lectora"],
            verified: true
        },
        {
            name: "Daniel Medina",
            age: 20,
            university: "UPNFM",
            gender: "masculino",
            cleanliness: 2, // Ordenado
            noise: 1,       // Silencioso
            horario: "diurno",
            mascota: "no",
            budget: 2500,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#E2E2B6"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#3F5E4D" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="40" r="18" fill="#F3A37C"/><path d="M32 32C40 24 60 24 68 32L65 35L35 35Z" fill="#1C1816"/><rect x="36" y="36" width="10" height="8" rx="2" stroke="#1C1816" stroke-width="2"/><rect x="54" y="36" width="10" height="8" rx="2" stroke="#1C1816" stroke-width="2"/><path d="M46 40H54" stroke="#1C1816" stroke-width="2"/><path d="M46 48C48 50 52 50 54 48" stroke="#1C1816" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Profesorado Inglés", "Tranquilo", "Melómano", "Organizado"],
            verified: true
        },
        {
            name: "Gabriela Paz",
            age: 22,
            university: "UNAH-CURC",
            gender: "femenino",
            cleanliness: 2, // Ordenado
            noise: 3,       // Festivo
            horario: "nocturno",
            mascota: "si",
            budget: 5000,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#FFE5EC"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#D81159" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="40" r="18" fill="#F0A6CA"/><path d="M32 30C32 20 68 20 68 30C68 55 64 50 64 60C64 60 36 60 36 60C36 50 32 55 32 30Z" fill="#3A2E2B"/><circle cx="43" cy="40" r="2" fill="#FAF5F0"/><circle cx="57" cy="40" r="2" fill="#FAF5F0"/><path d="M44 47C46 50 54 50 56 47" stroke="#FAF5F0" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Marketing", "Extrovertida", "Perro pequeño", "Social"],
            verified: false
        },
        {
            name: "Julián Castro",
            age: 19,
            university: "UJCV",
            gender: "masculino",
            cleanliness: 1, // Básico
            noise: 2,       // Moderado
            horario: "nocturno",
            mascota: "no",
            budget: 2800,
            avatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#D8F3DC"/><path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80" stroke="#1B4332" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="40" r="18" fill="#FFC9B9"/><path d="M32 35C35 24 65 24 68 35H32Z" fill="#E76F51"/><path d="M50 25L76 29C76 29 70 32 60 32" stroke="#E76F51" stroke-width="4" stroke-linecap="round"/><circle cx="43" cy="42" r="2" fill="#2D201A"/><circle cx="57" cy="42" r="2" fill="#2D201A"/><path d="M46 48C48 50 52 50 54 48" stroke="#2D201A" stroke-width="2" stroke-linecap="round"/></svg>`,
            tags: ["Diseño Gráfico", "Gamer", "Nocturno", "Chill"],
            verified: true
        }
    ];

    // Simulator Elements
    const rngLimpieza = document.getElementById('rng-limpieza');
    const rngRuido = document.getElementById('rng-ruido');
    const btnGroupHorario = document.getElementById('btn-group-horario');
    const btnGroupMascota = document.getElementById('btn-group-mascota');
    const rngPresupuesto = document.getElementById('rng-presupuesto');

    // Values display elements
    const lblLimpieza = document.getElementById('lbl-limpieza');
    const lblRuido = document.getElementById('lbl-ruido');
    const lblPresupuesto = document.getElementById('lbl-presupuesto');
    const lblMascota = document.getElementById('lbl-mascota');
    const lblHorario = document.getElementById('lbl-horario');
    const matchesContainer = document.getElementById('matches-container');
    const matchesCount = document.getElementById('matches-count');

    // State of user inputs
    let userCriteria = {
        cleanliness: 3,
        noise: 2,
        horario: 'diurno',
        mascota: 'si',
        budget: 3000
    };

    if (rngLimpieza && rngRuido && rngPresupuesto && matchesContainer) {
        
        // Init Event Listeners for inputs
        rngLimpieza.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            userCriteria.cleanliness = val;
            const labels = ["Básico", "Ordenado", "Minucioso"];
            lblLimpieza.innerText = labels[val - 1];
            runMatchAlgorithm();
        });

        rngRuido.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            userCriteria.noise = val;
            const labels = ["Silencioso", "Moderado", "Festivo"];
            lblRuido.innerText = labels[val - 1];
            runMatchAlgorithm();
        });

        rngPresupuesto.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            userCriteria.budget = val;
            lblPresupuesto.innerText = `L ${val.toLocaleString()} / mes`;
            runMatchAlgorithm();
        });

        // Toggle buttons group listener
        if (btnGroupHorario) {
            const buttons = btnGroupHorario.querySelectorAll('.toggle-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const val = btn.getAttribute('data-val');
                    userCriteria.horario = val;
                    lblHorario.innerText = val.charAt(0).toUpperCase() + val.slice(1);
                    runMatchAlgorithm();
                });
            });
        }

        if (btnGroupMascota) {
            const buttons = btnGroupMascota.querySelectorAll('.toggle-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const val = btn.getAttribute('data-val');
                    userCriteria.mascota = val;
                    lblMascota.innerText = val === 'si' ? 'Sí' : 'No';
                    runMatchAlgorithm();
                });
            });
        }

        // Run matching logic
        function runMatchAlgorithm() {
            let matchedList = roommatesData.map(roomie => {
                let scores = [];

                // 1. Cleanliness Match Score (20% weight)
                const cleanDiff = Math.abs(roomie.cleanliness - userCriteria.cleanliness);
                let cleanScore = 100 - (cleanDiff * 30);
                scores.push(cleanScore);

                // 2. Noise Match Score (20% weight)
                const noiseDiff = Math.abs(roomie.noise - userCriteria.noise);
                let noiseScore = 100 - (noiseDiff * 30);
                scores.push(noiseScore);

                // 3. Schedule Match Score (20% weight)
                let horarioScore = (roomie.horario === userCriteria.horario) ? 100 : 50;
                scores.push(horarioScore);

                // 4. Pet Match Score (20% weight)
                let petScore = 100;
                if (userCriteria.mascota === 'no' && roomie.mascota === 'si') {
                    petScore = 30; // user dislikes pets, but roomie has pets
                } else if (userCriteria.mascota === 'si' && roomie.mascota === 'no') {
                    petScore = 90; // user accepts pets, roomie doesn't have pets (still highly compatible)
                }
                scores.push(petScore);

                // 5. Budget Match Score (20% weight)
                let budgetScore = 100;
                if (roomie.budget > userCriteria.budget) {
                    const overBudget = roomie.budget - userCriteria.budget;
                    budgetScore = Math.max(0, 100 - (overBudget / 15)); // drops by 1% for every L 15 over budget
                }
                scores.push(budgetScore);

                // Calculate weighted average
                const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

                return {
                    ...roomie,
                    matchPercentage: averageScore
                };
            });

            // Sort by compatibility descending
            matchedList.sort((a, b) => b.matchPercentage - a.matchPercentage);

            // Filter out match compatibility < 40%
            matchedList = matchedList.filter(roomie => roomie.matchPercentage >= 40);

            // Render output cards
            renderMatches(matchedList);
        }

        // Render cards in DOM
        function renderMatches(list) {
            matchesContainer.innerHTML = '';
            matchesCount.innerText = `${list.length} Compañero${list.length !== 1 ? 's' : ''} Encontrado${list.length !== 1 ? 's' : ''}`;

            if (list.length === 0) {
                matchesContainer.innerHTML = `
                    <div class="card-glass text-center" style="padding: 40px;">
                        <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px;"></i>
                        <h4>No se encontraron Coincidencias Exactas</h4>
                        <p style="color: var(--text-muted); margin-top: 8px;">Prueba a ampliar tu presupuesto o flexibilizar algunos hábitos.</p>
                    </div>
                `;
                return;
            }

            list.forEach(roomie => {
                const card = document.createElement('div');
                card.className = 'match-card';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
                
                // Color representing compatibility percentage
                let colorClass = 'var(--color-primary)';
                if (roomie.matchPercentage < 70) colorClass = 'var(--color-secondary)';
                if (roomie.matchPercentage < 50) colorClass = 'var(--text-muted)';

                // Cleanliness Label
                const cleanLabels = ["Limpieza Básica", "Ordenado", "Minucioso"];
                const noiseLabels = ["Silencioso", "Moderado", "Festivo"];

                const verifiedBadgeMarkup = roomie.verified 
                    ? `<span class="verified-badge" title="Identidad Verificada"><i class="fa-solid fa-circle-check"></i></span>` 
                    : '';

                const tagsMarkup = roomie.tags.map(tag => `<span>${tag}</span>`).join('');
                
                // Add border class for verified roommate profiles
                const borderClass = roomie.verified ? 'verified-border' : '';

                card.innerHTML = `
                    <div class="match-profile-info">
                        <div class="profile-avatar ${borderClass}">${roomie.avatar}</div>
                        <div class="profile-txt">
                            <h4>${roomie.name} ${verifiedBadgeMarkup}</h4>
                            <span class="univ-tag">${roomie.university} • ${roomie.age} años</span>
                            <div class="match-habits-pills">
                                <span>${cleanLabels[roomie.cleanliness - 1]}</span>
                                <span>${noiseLabels[roomie.noise - 1]}</span>
                                <span>${roomie.horario === 'diurno' ? 'Día' : 'Noche'}</span>
                                ${tagsMarkup}
                            </div>
                        </div>
                    </div>
                    <div class="match-metrics-actions">
                        <div class="compatibility-score">
                            <span class="score-num" style="color: ${colorClass}">${roomie.matchPercentage}%</span>
                            <span class="score-label">Compatibilidad</span>
                        </div>
                        <a href="contacto.html" class="btn btn-secondary btn-sm" style="padding: 8px 16px; font-size: 0.8rem;">Conectar</a>
                    </div>
                `;

                matchesContainer.appendChild(card);
            });
        }

        // Initialize first run
        runMatchAlgorithm();
    }

    // 4. HERO WIDGET LINK TO SIMULATOR
    const widgetSearchBtn = document.getElementById('widget-search-btn');
    if (widgetSearchBtn) {
        widgetSearchBtn.addEventListener('click', () => {
            const u = document.getElementById('widget-univ').value;
            const b = document.getElementById('widget-budget').value;
            const h = document.querySelector('.habit-pills .pill.active').getAttribute('data-val');
            
            // Save search settings in sessionStorage to apply in simulator page
            sessionStorage.setItem('roomies_quick_univ', u);
            sessionStorage.setItem('roomies_quick_budget', b);
            sessionStorage.setItem('roomies_quick_habit', h);
            
            // Redirect to simulator page
            window.location.href = 'simulador.html';
        });

        // Pill behavior in widget
        const pills = document.querySelectorAll('.habit-pills .pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    // Read quick settings if loaded in simulator.html page
    if (window.location.pathname.includes('simulador.html')) {
        const qBudget = sessionStorage.getItem('roomies_quick_budget');
        const qHabit = sessionStorage.getItem('roomies_quick_habit');

        if (qBudget && rngPresupuesto) {
            rngPresupuesto.value = qBudget;
            lblPresupuesto.innerText = `L ${parseInt(qBudget).toLocaleString()} / mes`;
            userCriteria.budget = parseInt(qBudget);
            sessionStorage.removeItem('roomies_quick_budget');
        }

        if (qHabit) {
            if (qHabit === 'limpieza' && rngLimpieza) {
                rngLimpieza.value = 3;
                lblLimpieza.innerText = "Minucioso";
                userCriteria.cleanliness = 3;
            } else if (qHabit === 'mascotas' && btnGroupMascota) {
                const btnSi = btnGroupMascota.querySelector('[data-val="si"]');
                if (btnSi) btnSi.click();
            }
            sessionStorage.removeItem('roomies_quick_habit');
        }
        
        // Trigger match update if we modified properties
        if (typeof runMatchAlgorithm === 'function') {
            runMatchAlgorithm();
        }
    }
});
