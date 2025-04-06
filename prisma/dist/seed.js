"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPassword, admin, clientPassword, client, exercises, createdExercises, _i, exercises_1, exercise, createdExercise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.hash('admin123', 10)];
                case 1:
                    adminPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@activera.com' },
                            update: {},
                            create: {
                                email: 'admin@activera.com',
                                name: 'Administrator',
                                password: adminPassword,
                                role: 'ADMIN',
                                createdAt: new Date('2024-01-01'),
                                updatedAt: new Date('2024-01-01')
                            },
                        })
                        // Create test client user
                    ];
                case 2:
                    admin = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('client123', 10)];
                case 3:
                    clientPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'client@example.com' },
                            update: {},
                            create: {
                                email: 'client@example.com',
                                name: 'Test Client',
                                password: clientPassword,
                                role: 'CLIENT',
                            },
                        })
                        // Create sample exercises
                    ];
                case 4:
                    client = _a.sent();
                    exercises = [
                        {
                            id: 'mindful-breathing',
                            translations: {
                                en: {
                                    title: 'Mindful Breathing',
                                    introduction: '<p>A simple yet powerful mindfulness exercise to help you stay present and centered.</p>',
                                    duration: '<p>10-15 minutes</p>',
                                    benefits: '<ul><li>Reduced stress</li><li>Improved focus</li><li>Better emotional regulation</li></ul>',
                                    instructions: '<ol><li>Find a comfortable position</li><li>Close your eyes</li><li>Focus on your breath</li></ol>',
                                    tips: '<p>Remember to be gentle with yourself and maintain a non-judgmental attitude.</p>',
                                    accessibility: '<p>This exercise can be done sitting, lying down, or standing.</p>',
                                    prerequisites: '<p>No special equipment or prior experience needed.</p>',
                                    progressIndicators: '<p>You may notice improved concentration and reduced stress over time.</p>'
                                },
                                sv: {
                                    title: 'Medveten Andning',
                                    introduction: '<p>En enkel men kraftfull mindfulness-övning som hjälper dig att vara närvarande och centrerad.</p>',
                                    duration: '<p>10-15 minuter</p>',
                                    benefits: '<ul><li>Minskad stress</li><li>Förbättrat fokus</li><li>Bättre emotionell reglering</li></ul>',
                                    instructions: '<ol><li>Hitta en bekväm position</li><li>Blunda</li><li>Fokusera på din andning</li></ol>',
                                    tips: '<p>Kom ihåg att vara snäll mot dig själv och behåll en icke-dömande attityd.</p>',
                                    accessibility: '<p>Denna övning kan göras sittande, liggande eller stående.</p>',
                                    prerequisites: '<p>Ingen särskild utrustning eller tidigare erfarenhet krävs.</p>',
                                    progressIndicators: '<p>Du kan märka förbättrad koncentration och minskad stress över tid.</p>'
                                }
                            },
                            category: 'NARVARO',
                            difficulty: 'BEGINNER',
                            recommendedTime: ['MORNING', 'EVENING'],
                            relatedExerciseIds: [],
                            order: 1,
                            userId: admin.id,
                            mediaIds: []
                        },
                        {
                            id: 'accepting-emotions',
                            translations: {
                                en: {
                                    title: 'Accepting Emotions',
                                    introduction: '<p>Learn to observe and accept your emotions without judgment.</p>',
                                    duration: '<p>15-20 minutes</p>',
                                    benefits: '<ul><li>Increased emotional awareness</li><li>Better emotional regulation</li><li>Reduced emotional reactivity</li></ul>',
                                    instructions: '<ol><li>Find a quiet space</li><li>Notice your current emotional state</li><li>Observe without trying to change anything</li></ol>',
                                    tips: '<p>Remember that all emotions are valid and temporary.</p>',
                                    accessibility: '<p>This exercise can be done in any comfortable position.</p>',
                                    prerequisites: '<p>Basic mindfulness experience recommended but not required.</p>',
                                    progressIndicators: '<p>You may notice increased emotional awareness and less reactivity.</p>'
                                },
                                sv: {
                                    title: 'Acceptera Känslor',
                                    introduction: '<p>Lär dig att observera och acceptera dina känslor utan att döma.</p>',
                                    duration: '<p>15-20 minuter</p>',
                                    benefits: '<ul><li>Ökad känslomässig medvetenhet</li><li>Bättre känsloreglering</li><li>Minskad känslomässig reaktivitet</li></ul>',
                                    instructions: '<ol><li>Hitta en lugn plats</li><li>Notera ditt nuvarande känslotillstånd</li><li>Observera utan att försöka förändra något</li></ol>',
                                    tips: '<p>Kom ihåg att alla känslor är giltiga och tillfälliga.</p>',
                                    accessibility: '<p>Denna övning kan göras i valfri bekväm position.</p>',
                                    prerequisites: '<p>Grundläggande mindfulness-erfarenhet rekommenderas men krävs inte.</p>',
                                    progressIndicators: '<p>Du kan märka ökad känslomässig medvetenhet och mindre reaktivitet.</p>'
                                }
                            },
                            category: 'OPPENHET',
                            difficulty: 'INTERMEDIATE',
                            recommendedTime: ['ANY'],
                            relatedExerciseIds: [],
                            order: 1,
                            userId: admin.id,
                            mediaIds: []
                        },
                        {
                            id: 'values-exploration',
                            translations: {
                                en: {
                                    title: 'Values Exploration',
                                    introduction: '<p>A guided exercise to help you identify and connect with your personal values.</p>',
                                    duration: '<p>20-30 minutes</p>',
                                    benefits: '<ul><li>Clearer sense of purpose</li><li>Better decision making</li><li>Increased motivation</li></ul>',
                                    instructions: '<ol><li>Find a quiet space for reflection</li><li>Consider different life areas</li><li>Identify what matters most to you</li></ol>',
                                    tips: '<p>Focus on what truly matters to you, not what others expect.</p>',
                                    accessibility: '<p>Can be done through writing, thinking, or recording thoughts.</p>',
                                    prerequisites: '<p>A journal or recording device might be helpful but not required.</p>',
                                    progressIndicators: '<p>You may notice more alignment between your actions and values.</p>'
                                },
                                sv: {
                                    title: 'Utforska Värderingar',
                                    introduction: '<p>En guidad övning för att hjälpa dig identifiera och anknyta till dina personliga värderingar.</p>',
                                    duration: '<p>20-30 minuter</p>',
                                    benefits: '<ul><li>Tydligare känsla av mening</li><li>Bättre beslutsfattande</li><li>Ökad motivation</li></ul>',
                                    instructions: '<ol><li>Hitta en lugn plats för reflektion</li><li>Överväg olika livsområden</li><li>Identifiera vad som betyder mest för dig</li></ol>',
                                    tips: '<p>Fokusera på vad som verkligen betyder något för dig, inte vad andra förväntar sig.</p>',
                                    accessibility: '<p>Kan göras genom att skriva, tänka eller spela in tankar.</p>',
                                    prerequisites: '<p>En dagbok eller inspelningsenhet kan vara hjälpsam men krävs inte.</p>',
                                    progressIndicators: '<p>Du kan märka bättre överensstämmelse mellan dina handlingar och värderingar.</p>'
                                }
                            },
                            category: 'ENGAGEMANG',
                            difficulty: 'INTERMEDIATE',
                            recommendedTime: ['ANY'],
                            relatedExerciseIds: [],
                            order: 1,
                            userId: admin.id,
                            mediaIds: []
                        }
                    ];
                    createdExercises = [];
                    _i = 0, exercises_1 = exercises;
                    _a.label = 5;
                case 5:
                    if (!(_i < exercises_1.length)) return [3 /*break*/, 8];
                    exercise = exercises_1[_i];
                    return [4 /*yield*/, prisma.exercise.upsert({
                            where: {
                                id: exercise.id
                            },
                            update: {
                                translations: exercise.translations,
                                category: exercise.category,
                                difficulty: exercise.difficulty,
                                recommendedTime: exercise.recommendedTime,
                                order: exercise.order,
                                userId: exercise.userId,
                                mediaIds: exercise.mediaIds
                            },
                            create: exercise,
                        })];
                case 6:
                    createdExercise = _a.sent();
                    console.log("Created exercise: ".concat(createdExercise.id));
                    createdExercises.push(createdExercise);
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: 
                // Create some progress records
                return [4 /*yield*/, prisma.exerciseProgress.upsert({
                        where: {
                            userId_exerciseId: {
                                userId: client.id,
                                exerciseId: createdExercises[0].id,
                            },
                        },
                        update: {},
                        create: {
                            userId: client.id,
                            exerciseId: createdExercises[0].id,
                            completed: true,
                            notes: 'This was very helpful for reducing stress.',
                            completedAt: new Date(),
                        },
                    })];
                case 9:
                    // Create some progress records
                    _a.sent();
                    console.log('Database has been seeded. 🌱');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
