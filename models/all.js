/* eslint-disable no-console */
const Sequelize = require('sequelize');
const { db } = require('../oa.config');
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
// Option 1: Passing parameters separately
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  operatorsAliases
});

const User = sequelize.define('user', {
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

const Group = sequelize.define('group', {
  groupname: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true
})

const Area = sequelize.define('area', {
  areaname: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true
})

const Resume = sequelize.define('resume', {
  // attributes
  realname: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  birthyear: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  province: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  city: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true
  },
  industry: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  jobclass: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  job: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  experience: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  school: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  degree: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  filepath: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  }
}, {
  timestamps: true
});

const ResumeWork = sequelize.define('resume_work', {
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  job: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  salary: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  starttime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  endtime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
}, {
  timestamps: false
});

const ResumeEducation = sequelize.define('resume_education', {
  school: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  degree: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  major: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  isunified: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  endtime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
}, {
  timestamps: false
});

const ResumeRecord = sequelize.define('resume_record', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: true
})

const Favorite = sequelize.define('favorite', {
}, {
  timestamps: false
})

const FavResume = sequelize.define('fav_resume', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    },
    defaultValue: 0
}
}, {
  timestamps: false
})

User.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'group'
})

User.belongsTo(Area, {
  foreignKey: 'areaId',
  as: 'area'
})

Group.belongsTo(Area, {
  foreignKey: 'areaId',
  as: 'area'
})

Resume.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

Resume.hasMany(ResumeWork, {
  foreignKey: 'resumeId',
  as: 'works'
})

Resume.hasMany(ResumeEducation, {
  foreignKey: 'resumeId',
  as: 'educations'
})

Resume.hasMany(ResumeRecord, {
  foreignKey: 'resumeId',
  as: 'records'
})

ResumeRecord.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
})

Resume.belongsToMany(Favorite, {
  through: FavResume,
  foreignKey: 'resumeId'
})

Favorite.belongsToMany(Resume, {
  through: FavResume,
  foreignKey: 'favoriteId'
})

// User.belongsToMany(Favorite, {
//   through: FavResume,
//   foreignKey: 'userId'
// })

module.exports = {
  sequelize,
  User,
  Group,
  Area,
  Resume,
  ResumeWork,
  ResumeEducation,
  ResumeRecord,
  Favorite,
  FavResume
};