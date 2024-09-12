const User = require('./Entities/user.entity');
const Addresses = require('../address/Entities/addresses.entity');
const Cities = require('../city/Entities/cities.entity');
const States = require('../state/Entities/states.entity');

async function createUser(userData) {
    try {

        if (!userData.name || !userData.email || !userData.password || !userData.cpf) {
            throw new Error('Campos obrigatórios ausentes. Os campos nome, email, senha, telefone e cpf são necessários.');
        }

        if (userData.password.length < 8) {
            throw new Error('A senha deve ter pelo menos 8 caracteres.');
        }

   
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            throw new Error('E-mail inválido.');
        }


        if (!/^\d{11}$/.test(userData.cpf)) {
            throw new Error('O CPF deve ter 11 dígitos.');
        }


        const existingUserByEmail = await User.findOne({ where: { email: userData.email } });
        if (existingUserByEmail) {
            throw new Error('E-mail já registrado.');
        }


        const existingUserByCpf = await User.findOne({ where: { cpf: userData.cpf } });
        if (existingUserByCpf) {
            throw new Error('CPF já registrado.');
        }

        const existingUserByPhone = await User.findOne({ where: { phone: userData.phone } });
        if (existingUserByPhone) {
            throw new Error('Telefone já registrado.');
        }

        if (userData.phone && !/^\d+$/.test(userData.phone)) {
            throw new Error('O telefone deve conter apenas números.');
        }

        if (!/[A-Z]/.test(userData.password) || !/[a-z]/.test(userData.password)) {
            throw new Error('A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula.');
        }

        if (userData.phone) {
            if (!/^\d{13}$/.test(userData.phone)) {
                throw new Error('O telefone deve conter exatamente 13 dígitos.');
            }
        }


        const newUser = await User.create(userData);


        const userJson = newUser.toJSON();
        delete userJson.password;

        return { status: 201, message: "Usuário criado com sucesso." };
    } catch (e) {
        return { status: 400, message: e.message };
    }
}



async function getAllUsers() {
    try{

        const users = await User.findAll()
        return { status: 201, data: users };
    }
    
    catch (e) {

    return { status: 400, message: e.message };
 }

}

async function getUserById(idUser) {
    try {
        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }

        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return { status: 200, data: user }; 
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

async function getUserByEmail(email) {
    try {
        if (!email || typeof email !== 'string') {
            throw new Error('Email inválido.');
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return { status: 200, data: user };
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

async function deleteUserById(idUser) {
    try {
        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }
        

        const user = await User.findByPk(idUser, {
            include: [{ model: Addresses, as: 'addresses' }]
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }


        if (user.addresses.length > 0) {
            await Addresses.destroy({ where: { user_id: idUser } });
        }


        await user.destroy();
        
        return { status: 200, message: "Usuário excluído com sucesso" };

    } catch (e) {
        return { status: 400, message: e.message };
    }
}


async function getUserByIdUsingRelations(userId) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Addresses,
            as: 'addresses',
            include: [
              {
                model: Cities,
                as: 'cities',
                include: [
                  {
                    model: States,
                    as: 'states'
                  }
                ]
              }
            ]
          }
        ]
      });
  
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
  
      return { status: 200, data: user };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  
  }

  async function updateUser(idUser, userData) {

    try {
        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }

        const user = await User.findByPk(idUser);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

 
        if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            throw new Error('E-mail inválido.');
        }

        if (userData.phone && !/^\d+$/.test(userData.phone)) {
            throw new Error('O telefone deve conter apenas números.');
        }

        if (userData.password) {
            if (userData.password.length < 8) {
                throw new Error('A senha deve ter pelo menos 8 caracteres.');
            }

            if (!/[A-Z]/.test(userData.password) || !/[a-z]/.test(userData.password)) {
                throw new Error('A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula.');
            }
        }

        if (userData.cpf && !/^\d{11}$/.test(userData.cpf)) {
            throw new Error('O CPF deve ter 11 dígitos.');
        }

        if (userData.phone) {
            if (!/^\d{13}$/.test(userData.phone)) {
                throw new Error('O telefone deve conter exatamente 13 dígitos.');
            }
        }



        await user.update(userData);
        
        const updatedUser = await User.findByPk(idUser);
        const userJson = updatedUser.toJSON();
        delete userJson.password;

        return { status: 200, message: 'Dados atualizados com sucesso.' };
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

module.exports = {
    createUser, getAllUsers, getUserById, deleteUserById, getUserByIdUsingRelations, updateUser
};