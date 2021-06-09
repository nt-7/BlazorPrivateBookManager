module.exports = async function (context, req) {
    const header = req.headers["x-ms-client-principal"];
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.tostring("ascii");

    context.res = {
        body: JSON.parse(decoded)
    };
};