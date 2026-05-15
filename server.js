const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

// CONFIGURACIÓN CON TU ACCESS TOKEN DE LA IMAGEN
const client = new MercadoPagoConfig({ 
    accessToken: "APP_USR-6394143932365865-051117-aa71bcf70e12a351757f91005a61f5d6-3335514367" 
});

app.post("/create_preference", async (req, res) => {
    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: req.body.items,
                back_urls: {
                    // Aquí puse tu URL de carteras para que el cliente vuelva al sitio tras pagar
                    success: "https://cartera360.netlify.app",
                    failure: "https://cartera360.netlify.app",
                    pending: "https://cartera360.netlify.app"
                },
                auto_return: "approved",
            },
        });
        res.json({ id: result.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de Carteras Lux listo en puerto ${PORT}`));
