const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username : { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, allowNull: true },
    profession: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
    town: { type: DataTypes.STRING, allowNull: true }
});

const Company = sequelize.define('Company', {
    name: { type: DataTypes.STRING, primaryKey: true, allowNull: false,unique: true },
    image: { type: DataTypes.STRING, allowNull: true },
    ownerName: { type: DataTypes.STRING, allowNull: true,
        references: {
            model: User,
            key: 'username'
        },
        onDelete: 'CASCADE'
    },
    info: { type: DataTypes.TEXT, allowNull: true }
});

Company.belongsTo(User, { as: 'owner', foreignKey: 'ownerName' });
User.hasMany(Company, { as: 'companies', foreignKey: 'ownerName' });

const CompanyVacancy = sequelize.define('CompanyVacancy', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyName: { type: DataTypes.STRING,
        references: {
            model: Company,
            key: 'name'
        },
        onDelete: 'CASCADE'
    },
    vacancy: { type: DataTypes.STRING, allowNull: false },
    open_vacancies: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    experience: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Не нужен' },
    info: { type: DataTypes.TEXT, allowNull: true },
    initial_test: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Теста нет' }
});

CompanyVacancy.belongsTo(Company, { foreignKey: 'companyName', targetKey: 'name' });
Company.hasMany(CompanyVacancy, { foreignKey: 'companyName', sourceKey: 'name' });

const CompanyDocuments = sequelize.define('CompanyDocuments', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyName: { type: DataTypes.STRING,
        references: {
            model: Company,
            key: 'name'
        },
        onDelete: 'CASCADE'
    },
    doc_title: { type: DataTypes.STRING, allowNull: false },
    files: { type: DataTypes.STRING, allowNull: true },
    doc_name: { type: DataTypes.STRING, allowNull: true }
});

CompanyDocuments.belongsTo(Company, { foreignKey: 'companyName', targetKey: 'name' });
Company.hasMany(CompanyDocuments, { foreignKey: 'companyName', sourceKey: 'name' });

const InitialTestAnswers = sequelize.define('InitialTestAnswers', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    testId: { type: DataTypes.INTEGER,
        references: {
            model: CompanyVacancy,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    question: { type: DataTypes.TEXT, allowNull: false },
    answer: { type: DataTypes.TEXT, allowNull: false }
});

InitialTestAnswers.belongsTo(CompanyVacancy, { foreignKey: 'testId', targetKey: 'id' });
CompanyVacancy.hasMany(InitialTestAnswers, { foreignKey: 'testId', sourceKey: 'id' });

const UsersTests = sequelize.define('UsersTests', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    testId: { type: DataTypes.INTEGER,
        references: {
            model: CompanyVacancy,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    username: { type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        },
        onDelete: 'CASCADE'
    },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: 'Не оценён' }
}, {
    indexes: [
        {
            unique: true,
            fields: ['testId', 'username']
        }
    ]
});

UsersTests.belongsTo(CompanyVacancy, { foreignKey: 'testId', targetKey: 'id' });
UsersTests.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });
CompanyVacancy.hasMany(UsersTests, { foreignKey: 'testId', sourceKey: 'id' });
User.hasMany(UsersTests, { foreignKey: 'username', sourceKey: 'username' });

const UsersVacancies = sequelize.define('UsersVacancies', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        },
        onDelete: 'CASCADE'
    },
    vacancyId: { type: DataTypes.INTEGER,
        references: {
            model: CompanyVacancy,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['username', 'vacancyId']
        }
    ]
});

UsersVacancies.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });
UsersVacancies.belongsTo(CompanyVacancy, { foreignKey: 'vacancyId', targetKey: 'id' });
User.hasMany(UsersVacancies, { foreignKey: 'username', sourceKey: 'username' });
CompanyVacancy.hasMany(UsersVacancies, { foreignKey: 'vacancyId', sourceKey: 'id' });

module.exports = {
    User,
    Company,
    CompanyVacancy,
    CompanyDocuments,
    InitialTestAnswers,
    UsersTests,
    UsersVacancies
};