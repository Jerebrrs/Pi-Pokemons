const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [0, 20]
        }
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue: 'imagen no ingresada',
      },
      pokedex: {
        type: DataTypes.INTEGER,
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 999
        }
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 999,
        }
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 999
        }
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 999
        }
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 999
        }
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 9999
        }
      },
      createdInDb : {
				// Adicional
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
    },
    { timestamps: false }
  );
};

