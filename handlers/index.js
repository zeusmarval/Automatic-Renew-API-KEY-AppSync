var AWS = require('aws-sdk');

async function asyncForEach(array, callback) {
    let len = array.length;
    for (let index = 0; index < len; index++) {
        await callback(array[index], index, array);
    }
}

exports.handler = async (event) => {

    let keyCount = 0;
    let errorUpdate = 0;
    const appsync = new AWS.AppSync({ apiVersion: "2017-07-25" });
    let d = new Date();
    d.setDate(d.getDate() + 365);
    d.setHours(0, 0, 0);
    d.setMilliseconds(0);
    const expires = (d / 1000) | 0;

    const graphQlResponse = await appsync.listGraphqlApis({ maxResults: 25 }).promise();

    if (
        !graphQlResponse.graphqlApis ||
        graphQlResponse.graphqlApis.length === 0
    ) {
        response.statusCode = 404;
        response.body = JSON.stringify("No APIs found!");
        return response;
    }

    await asyncForEach(graphQlResponse.graphqlApis, async (api) => {
        const apiId = api.apiId;
        const keysResponse = await appsync.listApiKeys({ apiId }).promise();

        if (!keysResponse.apiKeys || keysResponse.apiKeys.length === 0) {
            return;
        }

        await asyncForEach(keysResponse.apiKeys, async (key) => {
            let params = {
                apiId,
                id: key.id,
                expires,
            };
            const result = await appsync.updateApiKey(params).promise();

            result.apiKey ? keyCount++ : errorUpdate++;
        });
    });

    response.statusCode = 200;
    response.body = JSON.stringify(
        `${keyCount} key${keyCount !== 1 ? "s" : ""} updated.`
    );
    return response;

}
