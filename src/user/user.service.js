const User = require('./Entities/user.entity');
const Addresses = require('../address/Entities/addresses.entity');
const Cities = require('../city/Entities/cities.entity');
const States = require('../state/Entities/states.entity');
const Pets = require('../pets/Entities/pets.entity');
const Appointments = require('../appointments/Entities/appointments.entity');
const Services = require('../services/Entities/services.entity');
const Employers = require('../employers/Entities/employers.entity');
const Cart_items = require('../carts/Entities/cart_items.entity');
const Carts = require('../carts/Entities/carts.entity');
const Orders = require('../orders/Entities/orders.entity');
const Order_items = require('../orders/Entities/order_items.entity');
const Payments = require('../payments/Entities/payments.entity');

const cartsService = require('../carts/carts.service')

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
            if (!/^\d{11}$/.test(userData.phone)) {
                throw new Error('O telefone deve conter exatamente 11 dígitos, incluindo o seu DDD.');
            }
        }


        const newUser = await User.create(userData);
        await cartsService.addToCart(newUser.id, null, 0);


        const userJson = newUser.toJSON();
        delete userJson.password;

        return { status: 201, message: "Usuário criado com sucesso." };
    } catch (e) {
        return { status: 400, message: e.message };
    }
};



async function getAllUsers() {
    try{

        const users = await User.findAll()
        return { status: 201, data: users };
    }
    
    catch (e) {

    return { status: 400, message: e.message };
 }

};

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
};

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
};

async function deleteUserById(idUser) {
    try {
        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }


        const user = await User.findByPk(idUser, {
            include: [
                { model: Addresses, as: 'addresses' },
                { model: Pets, as: 'pets' },
                { model: Appointments, as: 'appointments' },
                { model: Payments, as: 'payments' },
                { model: Orders, as: 'orders' },
                { model: Carts, as: 'carts', include: [{ model: Cart_items, as: 'cart_items' }] }
            ]
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

     
        if (user.role === 'admin') {
            throw new Error('Usuários com o cargo de "admin" não podem ser excluídos.');
        }

      
        if (user.orders && user.orders.length > 0) {
            for (let order of user.orders) {
      
                await Order_items.destroy({ where: { order_id: order.id } });
            }
     
            await Orders.destroy({ where: { user_id: idUser } });
        }

   
        if (user.payments && user.payments.length > 0) {
            for (let payment of user.payments) {

                await Payments.destroy({ where: { user_id: idUser } });
            }
        }

     
        if (user.carts && user.carts.length > 0) {
            for (let cart of user.carts) {
                if (cart.cart_items && cart.cart_items.length > 0) {
                    await Cart_items.destroy({ where: { cart_id: cart.id } });
                }
            }
         
            await Carts.destroy({ where: { user_id: idUser } });
        }


        if (user.appointments && user.appointments.length > 0) {
            await Appointments.destroy({ where: { user_id: idUser } });
        }

     
        if (user.pets && user.pets.length > 0) {
            await Pets.destroy({ where: { user_id: idUser } });
        }

     
        if (user.addresses && user.addresses.length > 0) {
            await Addresses.destroy({ where: { user_id: idUser } });
        }


        await user.destroy();

        return { status: 200, message: "Usuário e dados relacionados excluídos com sucesso." };
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
  
  };

  const getUserByIdWithPetsAndAppointments = async (userId) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Pets,
            as: 'pets'
          },
          {
            model: Appointments,
            as: 'appointments',
            include: [
              {
                model: Pets,
                as: 'pets'
              },
              {
                model: Services, 
                as: 'services'
              },
              {
                model: Employers, 
                as: 'employers'
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
  };

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
            if (!/^\d{11}$/.test(userData.phone)) {
                throw new Error('O telefone deve conter exatamente 11 dígitos, incluindo o seu DDD.');
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
    createUser, getAllUsers, getUserById, deleteUserById, getUserByIdUsingRelations, updateUser, getUserByEmail, getUserByIdWithPetsAndAppointments
};