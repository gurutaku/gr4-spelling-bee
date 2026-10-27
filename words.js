        /* ===================================================================
           1. DEFAULT FALLBACK DATA (Used if words.json is missing or offline)
           =================================================================== */
        const FALLBACK_DATA = {
	"weeks": [
		{
			"id": "week1",
			"title": "Week 1",
			"words": [
				{
					"word": "mask",
					"sentence": "He wore a superhero mask to the costume party.",
					"hint": "A covering worn over the face"
				},
				{
					"word": "track",
					"sentence": "The train runs along the metal track.",
					"hint": "A path or rail for vehicles"
				},
				{
					"word": "stamp",
					"sentence": "Don't forget to put a stamp on the envelope before mailing it.",
					"hint": "A small sticker used for postage"
				},
				{
					"word": "stage",
					"sentence": "The actors walked out onto the stage to perform.",
					"hint": "A raised platform for performances"
				},
				{
					"word": "grade",
					"sentence": "She was happy to receive a high grade on her spelling test.",
					"hint": "A mark indicating quality or achievement"
				},
				{
					"word": "chance",
					"sentence": "Everyone deserves a second chance to try again.",
					"hint": "A possibility or opportunity"
				},
				{
					"word": "they",
					"sentence": "They went to the park together after school.",
					"hint": "Refers to two or more people"
				},
				{
					"word": "batch",
					"sentence": "Grandma baked a fresh batch of chocolate chip cookies.",
					"hint": "A quantity produced at one time"
				},
				{
					"word": "graph",
					"sentence": "We created a bar graph to display our science survey data.",
					"hint": "A diagram showing relationships between data"
				},
				{
					"word": "trade",
					"sentence": "I will trade my apple for your banana at lunch.",
					"hint": "To exchange one thing for another"
				},
				{
					"word": "raise",
					"sentence": "Please raise your hand if you know the answer.",
					"hint": "To lift or move upward"
				},
				{
					"word": "eight",
					"sentence": "An octopus has eight long arms.",
					"hint": "The number after seven"
				},
				{
					"word": "safety",
					"sentence": "Always wear a helmet for your safety while riding a bike.",
					"hint": "Protection from danger or risk"
				},
				{
					"word": "wrapped",
					"sentence": "She wrapped the birthday present in colorful paper.",
					"hint": "Covered or enclosed completely"
				},
				{
					"word": "laugh",
					"sentence": "The funny joke made everyone in the room laugh.",
					"hint": "To make sounds showing amusement"
				},
				{
					"word": "magical",
					"sentence": "The wizard performed a magical trick that amazed the audience.",
					"hint": "Having enchanting or supernatural qualities"
				},
				{
					"word": "station",
					"sentence": "We waited at the train station for our arrival.",
					"hint": "A stopping place on a transportation route"
				}
			]
		},
		{
			"id": "week2",
			"title": "Week 2",
			"words": [
				{
					"word": "golfer",
					"sentence": "The golfer practised hitting the ball across the green grass.",
					"hint": "A person who plays golf"
				},
				{
					"word": "felt",
					"sentence": "She felt happy when her friend invited her to play.",
					"hint": "Experienced a feeling or emotion"
				},
				{
					"word": "farmer",
					"sentence": "The farmer grew fresh vegetables on the family farm.",
					"hint": "A person who grows crops or raises animals"
				},
				{
					"word": "full",
					"sentence": "The glass was full of cold water.",
					"hint": "Containing as much as possible"
				},
				{
					"word": "feelings",
					"sentence": "Talking about our feelings can help us understand each other.",
					"hint": "Emotions such as happiness, sadness, or anger"
				},
				{
					"word": "family",
					"sentence": "Our family went camping together during the summer holidays.",
					"hint": "A group of people who are related or care for one another"
				},
				{
					"word": "cough",
					"sentence": "Cover your mouth when you cough to help prevent the spread of germs.",
					"hint": "To force air out of your throat suddenly"
				},
				{
					"word": "enough",
					"sentence": "We brought enough food for everyone at the picnic.",
					"hint": "As much or as many as needed"
				},
				{
					"word": "roof",
					"sentence": "The roof kept the rain from entering the house.",
					"hint": "The top covering of a building"
				},
				{
					"word": "rough",
					"sentence": "The rough surface of the rock felt bumpy against my hand.",
					"hint": "Not smooth; having an uneven surface"
				},
				{
					"word": "forgetful",
					"sentence": "My forgetful brother sometimes leaves his lunch at home.",
					"hint": "Often failing to remember things"
				},
				{
					"word": "fashion",
					"sentence": "The students learned how fashion styles have changed over time.",
					"hint": "A popular style of clothing or appearance"
				},
				{
					"word": "photograph",
					"sentence": "We took a photograph of the beautiful sunset at the beach.",
					"hint": "A picture taken with a camera"
				},
				{
					"word": "habitat",
					"sentence": "A forest is a habitat for many birds and animals.",
					"hint": "The natural home of a plant or animal"
				},
				{
					"word": "ecosystem",
					"sentence": "A pond ecosystem includes fish, plants, insects, and water.",
					"hint": "A community of living things interacting with their environment"
				}
			]
		}
	]
};

        /* ===================================================================
           2. WEB AUDIO SYNTHESIZER (No external audio files required)
           =================================================================== */
        const SoundFX = {
            ctx: null,
            init() {
                if (!this.ctx) {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (AudioCtx) this.ctx = new AudioCtx();
                }
            },
            playCorrect() {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
                osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.4);
            },
            playWrong() {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(110, now + 0.2);

                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            },
            playVictory() {
                this.init();
                if (!this.ctx) return;
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const now = this.ctx.currentTime + (idx * 0.12);
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now);

                    gain.gain.setValueAtTime(0.25, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.3);
                });
            }
        };

        /* ===================================================================
           3. WEB SPEECH API (Voice pronouncer & sentences)
           =================================================================== */
        function speakText(text, rate = 0.85) {
            if (!('speechSynthesis' in window)) return;

            const synth = window.speechSynthesis;
            synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = rate;
            utterance.pitch = 1.0;

            const voices = synth.getVoices();

            const voice =
                voices.find(v =>
                    v.lang.toLowerCase() === 'en-us' && v.default
                ) ||
                voices.find(v =>
                    v.lang.toLowerCase() === 'en-us'
                ) ||
                voices.find(v =>
                    v.lang.toLowerCase().startsWith('en')
                );

            if (voice) {
                utterance.voice = voice;
            }

            synth.speak(utterance);
        }

        /* ===================================================================
           4. GAME STATE VARIABLES
           =================================================================== */
        let weekData = [];
        let currentWeek = null;
        let currentWordIndex = 0;
        let score = 0;
        let streak = 0;
        let maxStreak = 0;
        let currentMode = 'test'; // 'test', 'scramble', 'flashcard'
        let selectedScrambleLetters = [];
        let flashcardFlipped = false;

        /* ===================================================================
           5. DATA LOADING & INITIALIZATION
           =================================================================== */
        async function loadWordData() {
            const statusBanner = document.getElementById('status-banner');
            try {
                // Fetch words.json relative to deployment root
                const response = await fetch('./words.json');
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);

                const json = await response.json();
                if (!json.weeks || !Array.isArray(json.weeks)) throw new Error("Invalid JSON format");

                weekData = json.weeks;
                statusBanner.innerHTML = `<i class="fa-solid fa-circle-check text-green-500"></i> Loaded from words.json`;
                statusBanner.className = "text-xs text-green-700 font-semibold bg-green-50 py-1.5 px-3 rounded-full border border-green-200 inline-block shadow-sm";
            } catch (err) {
                console.warn("Could not fetch words.json, utilizing built-in fallback dataset:", err);
                weekData = FALLBACK_DATA.weeks;
                statusBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-500"></i> Using Default Word List (words.json fallback)`;
                statusBanner.className = "text-xs text-amber-800 font-semibold bg-amber-50 py-1.5 px-3 rounded-full border border-amber-200 inline-block shadow-sm";
            }

            populateWeekDropdown();
        }

        function populateWeekDropdown() {
            const selectEl = document.getElementById('week-select');
            selectEl.innerHTML = '';

            weekData.forEach(week => {
                const opt = document.createElement('option');
                opt.value = week.id;
                opt.textContent = week.title || week.id;
                selectEl.appendChild(opt);
            });

            if (weekData.length > 0) {
                switchWeek(weekData[0].id);
            }
        }

        function switchWeek(weekId) {
            currentWeek = weekData.find(w => w.id === weekId) || weekData[0];
            restartWeekSession();
        }

        function restartWeekSession() {
            currentWordIndex = 0;
            score = 0;
            streak = 0;
            maxStreak = 0;
            document.getElementById('view-complete').classList.add('hidden');
            document.getElementById('stats-bar').classList.remove('hidden');
            switchMode(currentMode);
        }

        /* ===================================================================
           6. NAVIGATION & MODE SWITCHING
           =================================================================== */
        function switchMode(mode) {
            currentMode = mode;

            // Highlight Tab Buttons
            ['test', 'scramble', 'flashcard'].forEach(m => {
                const btn = document.getElementById(`tab-${m}`);
                if (m === mode) {
                    btn.className = "flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all bg-white text-purple-600 shadow-sm";
                } else {
                    btn.className = "flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all text-gray-600 hover:text-purple-600";
                }
            });

            // Toggle View Containers
            document.getElementById('view-test').classList.add('hidden');
            document.getElementById('view-scramble').classList.add('hidden');
            document.getElementById('view-flashcard').classList.add('hidden');
            document.getElementById('view-complete').classList.add('hidden');

            if (currentWordIndex >= currentWeek.words.length) {
                showCompletionScreen();
                return;
            }

            document.getElementById('stats-bar').classList.remove('hidden');

            if (mode === 'test') {
                document.getElementById('view-test').classList.remove('hidden');
                document.getElementById('view-test').classList.add('flex');
                setupTestMode();
            } else if (mode === 'scramble') {
                document.getElementById('view-scramble').classList.remove('hidden');
                document.getElementById('view-scramble').classList.add('flex');
                setupScrambleMode();
            } else if (mode === 'flashcard') {
                document.getElementById('view-flashcard').classList.remove('hidden');
                document.getElementById('view-flashcard').classList.add('flex');
                setupFlashcardMode();
            }

            updateDashboardUI();
        }

        function updateDashboardUI() {
            const total = currentWeek ? currentWeek.words.length : 0;
            document.getElementById('progress-text').innerText = `Word ${currentWordIndex + 1} of ${total}`;
            document.getElementById('score-text').innerHTML = `<i class="fa-solid fa-star"></i> ${score}`;
            document.getElementById('streak-text').innerHTML = `<i class="fa-solid fa-fire"></i> ${streak}`;

            const pct = total > 0 ? (currentWordIndex / total) * 100 : 0;
            document.getElementById('progress-bar').style.width = `${pct}%`;
        }

        function getCurrentWordObj() {
            return currentWeek ? currentWeek.words[currentWordIndex] : null;
        }

        function playTargetWord(slow = false) {
            const wObj = getCurrentWordObj();
            if (!wObj) return;

            const key = wObj.word.toLowerCase();
            const spokenWord = WORD_SAY_AS[key] || wObj.word;

            // Slower than normal, without slowing speech excessively.
            speakText(spokenWord, slow ? 0.6 : 0.85);
        }

        function speakSentence() {
            const wObj = getCurrentWordObj();
            if (wObj && wObj.sentence) speakText(wObj.sentence, 0.85);
        }

        /* ===================================================================
           7. MODE 1: SPELLING TEST LOGIC
           =================================================================== */
        function setupTestMode() {
            const input = document.getElementById('test-input');
            input.value = '';
            input.className = "w-full text-center text-2xl sm:text-3xl font-extrabold py-3.5 px-4 rounded-2xl border-4 border-gray-200 focus:outline-none focus:border-purple-400 text-gray-800 transition-all shadow-inner uppercase tracking-wider";
            document.getElementById('test-feedback-icon').classList.add('hidden');
            document.getElementById('test-hint-text').classList.add('hidden');

            // Auto focus on desktop
            if (window.innerWidth > 768) {
                setTimeout(() => input.focus(), 100);
            }
        }

        function toggleHint() {
            const wObj = getCurrentWordObj();
            const hintEl = document.getElementById('test-hint-text');
            if (wObj && wObj.hint) {
                hintEl.innerText = `💡 Hint: ${wObj.hint}`;
                hintEl.classList.toggle('hidden');
                if (!hintEl.classList.contains('hidden')) {
                    speakText(`Hint: ${wObj.hint}`);
                }
            }
        }

        function checkSpelling(event) {
            if (event) event.preventDefault();
            const input = document.getElementById('test-input');
            const userVal = input.value.trim().toLowerCase();
            const targetWord = getCurrentWordObj().word.toLowerCase();

            if (!userVal) return;

            if (userVal === targetWord) {
                // Correct
                SoundFX.playCorrect();
                score++;
                streak++;
                if (streak > maxStreak) maxStreak = streak;

                input.className = "w-full text-center text-2xl sm:text-3xl font-extrabold py-3.5 px-4 rounded-2xl border-4 border-green-500 bg-green-50 text-green-800 transition-all shadow-inner uppercase tracking-wider pulse-success";

                confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });

                setTimeout(() => {
                    advanceWord();
                }, 1200);
            } else {
                // Wrong
                SoundFX.playWrong();
                streak = 0;
                input.classList.remove('shake');
                void input.offsetWidth; // trigger layout reflow
                input.className = "w-full text-center text-2xl sm:text-3xl font-extrabold py-3.5 px-4 rounded-2xl border-4 border-red-400 bg-red-50 text-red-800 transition-all shadow-inner uppercase tracking-wider shake";

                setTimeout(() => {
                    input.value = '';
                    updateDashboardUI();
                }, 800);
            }

            updateDashboardUI();
        }

        /* ===================================================================
           8. MODE 2: WORD SCRAMBLE LOGIC
           =================================================================== */
        function setupScrambleMode() {
            const wObj = getCurrentWordObj();
            if (!wObj) return;

            selectedScrambleLetters = [];
            const originalLetters = wObj.word.toUpperCase().split('');

            // Shuffle letters
            let shuffled = [...originalLetters];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            // Ensure shuffled order isn't identical to target if length > 2
            if (shuffled.join('') === wObj.word.toUpperCase() && shuffled.length > 2) {
                [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
            }

            renderScrambleUI(shuffled);
        }

        function renderScrambleUI(poolLetters) {
            const slotsContainer = document.getElementById('scramble-answer-slots');
            const poolContainer = document.getElementById('scramble-letters-pool');

            slotsContainer.innerHTML = '';
            poolContainer.innerHTML = '';

            const targetLength = getCurrentWordObj().word.length;

            // Render Answer Slots
            for (let i = 0; i < targetLength; i++) {
                const letter = selectedScrambleLetters[i];
                const slot = document.createElement('div');
                slot.className = "w-11 h-12 sm:w-12 sm:h-14 border-b-4 border-indigo-400 bg-indigo-50/50 rounded-xl flex items-center justify-center font-black text-2xl text-indigo-900 shadow-sm transition-all";
                if (letter) {
                    slot.innerText = letter;
                    slot.onclick = () => removeScrambleLetter(i);
                    slot.classList.add('cursor-pointer', 'bg-indigo-100');
                }
                slotsContainer.appendChild(slot);
            }

            // Render Letter Pool
            poolLetters.forEach((char, idx) => {
                const tile = document.createElement('button');
                tile.className = "btn-bounce w-11 h-12 sm:w-12 sm:h-14 bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-2xl font-black text-xl text-slate-700 shadow-md flex items-center justify-center transition-all";
                tile.innerText = char;
                tile.onclick = () => selectScrambleLetter(char, poolLetters, idx);
                poolContainer.appendChild(tile);
            });
        }

        function selectScrambleLetter(char, currentPool, removeIdx) {
            if (selectedScrambleLetters.length < getCurrentWordObj().word.length) {
                selectedScrambleLetters.push(char);
                const newPool = currentPool.filter((_, i) => i !== removeIdx);
                renderScrambleUI(newPool);
            }
        }

        function removeScrambleLetter(index) {
            const removed = selectedScrambleLetters.splice(index, 1)[0];
            const wObj = getCurrentWordObj();
            const originalLetters = wObj.word.toUpperCase().split('');

            // Reconstruct pool from remaining letters
            let currentLetters = [...selectedScrambleLetters];
            let remainingPool = [];
            for (let char of originalLetters) {
                const foundIdx = currentLetters.indexOf(char);
                if (foundIdx > -1) {
                    currentLetters.splice(foundIdx, 1);
                } else {
                    remainingPool.push(char);
                }
            }
            renderScrambleUI(remainingPool);
        }

        function resetScrambleTiles() {
            selectedScrambleLetters = [];
            setupScrambleMode();
        }

        function checkScrambleAnswer() {
            const userAns = selectedScrambleLetters.join('').toLowerCase();
            const target = getCurrentWordObj().word.toLowerCase();

            if (userAns.length < target.length) return;

            if (userAns === target) {
                SoundFX.playCorrect();
                score++;
                streak++;
                if (streak > maxStreak) maxStreak = streak;
                confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
                setTimeout(() => advanceWord(), 1000);
            } else {
                SoundFX.playWrong();
                streak = 0;
                resetScrambleTiles();
            }
            updateDashboardUI();
        }

        /* ===================================================================
           9. MODE 3: FLASHCARDS LOGIC
           =================================================================== */
        function setupFlashcardMode() {
            const wObj = getCurrentWordObj();
            if (!wObj) return;

            flashcardFlipped = false;
            document.getElementById('flashcard-inner').classList.remove('rotate-y-180');

            document.getElementById('card-front-word').innerText = wObj.word.toUpperCase();
            document.getElementById('card-back-hint').innerText = wObj.hint || "Grade 4 Word";
            document.getElementById('card-back-sentence').innerText = wObj.sentence || `"${wObj.word}"`;
        }

        function flipFlashcard() {
            flashcardFlipped = !flashcardFlipped;
            const inner = document.getElementById('flashcard-inner');
            if (flashcardFlipped) {
                inner.classList.add('rotate-y-180');
            } else {
                inner.classList.remove('rotate-y-180');
            }
        }

        function navFlashcard(delta) {
            const total = currentWeek.words.length;
            currentWordIndex = (currentWordIndex + delta + total) % total;
            setupFlashcardMode();
            updateDashboardUI();
        }

        /* ===================================================================
           10. PROGRESSION & COMPLETION
           =================================================================== */
        function advanceWord() {
            currentWordIndex++;
            if (currentWordIndex < currentWeek.words.length) {
                switchMode(currentMode);
            } else {
                showCompletionScreen();
            }
        }

        function showCompletionScreen() {
            document.getElementById('view-test').classList.add('hidden');
            document.getElementById('view-scramble').classList.add('hidden');
            document.getElementById('view-flashcard').classList.add('hidden');
            document.getElementById('stats-bar').classList.add('hidden');

            document.getElementById('view-complete').classList.remove('hidden');
            document.getElementById('view-complete').classList.add('flex');

            const total = currentWeek.words.length;
            document.getElementById('final-score').innerText = `${score}/${total}`;
            document.getElementById('final-streak').innerText = `${maxStreak}`;

            SoundFX.playVictory();

            // Fireworks confetti animation
            const duration = 2500;
            const end = Date.now() + duration;

            (function frame() {
                confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }

        // Start app when DOM is ready
        window.addEventListener('DOMContentLoaded', loadWordData);
