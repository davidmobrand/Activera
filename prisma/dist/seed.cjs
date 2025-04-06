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
                            title: 'Mindful Breathing',
                            content: '<h2>Mindful Breathing Exercise</h2><p>Find a comfortable position and focus on your breath...</p>',
                            category: 'NARVARO',
                            order: 1,
                            userId: admin.id,
                        },
                        {
                            id: 'accepting-emotions',
                            title: 'Accepting Emotions',
                            content: '<h2>Accepting Emotions Exercise</h2><p>Notice your emotions without judgment...</p>',
                            category: 'OPPENHET',
                            order: 1,
                            userId: admin.id,
                        },
                        {
                            id: 'values-exploration',
                            title: 'Values Exploration',
                            content: '<h2>Values Exploration Exercise</h2><p>Reflect on what matters most to you...</p>',
                            category: 'ENGAGEMANG',
                            order: 1,
                            userId: admin.id,
                        },
                    ];
                    createdExercises = [];
                    _i = 0, exercises_1 = exercises;
                    _a.label = 5;
                case 5:
                    if (!(_i < exercises_1.length)) return [3 /*break*/, 8];
                    exercise = exercises_1[_i];
                    return [4 /*yield*/, prisma.exercise.upsert({
                            where: {
                                title_category: {
                                    title: exercise.title,
                                    category: exercise.category,
                                },
                            },
                            update: {
                                content: exercise.content,
                                order: exercise.order,
                                userId: exercise.userId,
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
