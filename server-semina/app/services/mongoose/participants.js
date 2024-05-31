const Participant = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/orders/model');
const Payments = require('../../api/v1/payments/model');

const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
  } = require('../../errors');
  const { createTokenParticipant, createJWT } = require('../../utils');

const { otpMail } = require('../mail')

const signupParcitipant = async (data) => {
    const { firstName, lastName, email, password, role } = req.body;

    // jika email dan status tidak aktif
    let result = await Participant.findOne({
        email,
        status: 'tidak aktif',
    });

    if (result) {
        result.firstName = firstName;
        result.lastName = lastName;
        result.role = role;
        result.email = email;
        result.password = password;
        result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
        result = await Participant.create({
            firstName, 
            lastName,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999),
        });
    }

    await otpMail(email, result);

    delete result._doc.password;
    delete result._doc.otp;

    return result;
};

const activeParticipant = async (req) => {
    const { otp, email } = req.body;
    const check = await Participant.findOne({
        email,
    });

    if (!check) throw new NotFoundError('Participant belum terdaftar');

    if (check && check.otp !== otp) throw new BadRequestError('Kode otp salah');

    const result = await Participant.findByIdAndUpdate(
        check._id,
        {
            status: 'aktif',
        },
        { new: true }
    );

    delete result._doc.password;

    return result;
}

const signParticipant = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new  BadRequestError('Please provide email dan password');
    }

    const result = await Participant.findOne({
        email: email
    });

    if (!result) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    if (result.status === 'tidak aktif') {
        throw new UnauthorizedError('Akun anda tidak aktif');
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = createJWT({ payload: createTokenParticipant(result) });

    return token;
}