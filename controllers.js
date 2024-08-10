const handleWebhook = (req, res) => {
    console.log("handle webhook");
    res.status(200).send('webhook handled');
};

module.exports = { handleWebhook };