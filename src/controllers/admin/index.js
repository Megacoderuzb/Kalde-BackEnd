const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../db");
const config = require("../../shared/config");

/**
 * Post admin
 * @param {express.Request} req
 * @param {express.Response} res
 */

const patchAdmin = async (req, res) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("admin").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli Admin topilmadi.`,
      });
    }

    if (changes.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changes.password, salt);
      changes.password = hashedPassword;
    }

    const updated = await db("admin")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "full_name", "phone_number"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getAdmin = async (req, res) => {
  try {
    const dbQuery = db("admin").select("id", "full_name", "phone_number");

    const admin = await dbQuery;

    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Get single admin
 * 1. Login qilgan hamma Adminlar ko'ra olishi mumkin
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await db("admin")
      .select("id", "full_name", "phone_number")
      .where({ id })
      .first();

    if (!admin) {
      return res.status(404).json({
        error: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { full_name, phone_number, password } = req.body;

    const existing = await db("admin")
      .where({ full_name, phone_number })
      .select("id", "password", "phone_number")
      .first();

    if (!existing) {
      return res.status(401).json({
        error: "phone_number yoki password xato.",
      });
    }

    const match = await bcrypt.compare(password, existing.password);

    if (!match) {
      return res.status(401).json({
        error: "phone_number yoki password xato.",
      });
    }

    const token = jwt.sign({ id: existing.id }, config.jwt.secret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,

      admin: {
        id: existing.id,
        phone_number: existing.phone_number,
        role: existing.role,
      },
    });
    console.log(existing);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  showAdmin,
  getAdmin,
  patchAdmin,
};
