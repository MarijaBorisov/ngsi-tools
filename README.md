# <a name="top"></a>Waste4Think NGSI Connector API
<br />
<br />
Waste4Think NGSI Connector API is a part of the backend implementation of the Waste4Think project, providing an API interface for other participants in the project.
Using this interface, users can do several operations:

* Create/update entity type structure which defines rules to be applied in order to create/update entities.

* Create entities from a file. The NGSI Connector API allows users to create a large number of entities directly from .csv or .json files, it also has customizable rules for defining how data from files will be checked.

* Update entities from a file, it can support full or partial update depending on user configuration.

* Supporting all Fiware Orion GET operations with queries, the goal is providing users with the ability to check data creation.

This project is part of [Waste4Think](http://waste4think.eu/). For more information, check the Waste4Think [Info](http://waste4think.eu/about-waste4think) section.

### Content
*  [Description](#description)
*  [Install](#install)
    * [Docker Hub](#docker-hub)
    * [Git Lab](#git-lab)
*  [Usage](#usage)
    * [Configuration](#configuration)
    * [Rules](#rules)
    * [Metadata](#metadata)
    * [API](#api)
*  [Project](#project)
*  [License](#license)
  

### Description

NGSI Connector API allows you to add rules for entity types by defining their structure, create or update entities in Fiware Orion instance from files, and query entity information. Using the NGSI Connector API, users can create a large number of entities while internal setting rules which make sure data integrity stays intact. The connector is providing a quick and safe way of adding data to Fiware Orion instance from different sources, at the moment of writing supporting file formats are **`.csv`** and **`.json`**.

With Connector, you are able to also query data in Fiware Orion. This part of its structure is set up to act like proxy which fully supports all Fiware Orion GET and query methods regarding entities. 

More information regarding Fiware Orion can be found on its official [documentation](https://fiware-orion.readthedocs.io/en/master/).
<br />

#### NGSI Connector API workflow:

NGSI Connector API is a Node.js implementation of the NGSIv2 REST API binding developed as a part
of the FIWARE platform.

1) **`Parsing`**:

- Parse input file, by converting it into a plain JSON object.

2) **`Checking`**:

- Checking parsed JSON object structure.
- Converting a parsed object to NGSI v2 API data structure, according to predefined rules.

3) **`Writing`**:

- Write data to Fiware Orion instance.
- Handle response from Fiware Orion.

4) **`Reporting`**:

- Prepare a report on the operation, including the number of successfully created entities, 
entities with errors and detail of each entity created including id, type, and status.


[Top](#waste4think-ngsi-connector-api)

## Install

NGSI Connector API can be installed from two sources, one of them is this repository and the other is Docker Hub which can be found on
[Docker](https://cloud.docker.com/u/waste4think/repository/docker/waste4think/ngsi-connector) repository.

#### Docker Hub
  1. Make sure you have Docker and Docker-Compose installed on your server/machine, more info about this can be found on the following [Documentation](https://docs.docker.com/docker-for-windows/install/)
  2. Go to Waste4think official [Docker](https://cloud.docker.com/u/waste4think/repository/docker/waste4think/ngsi-connector) repository.
  3. Example of running NGSI Connector API from Docker Hub would be:
    * **`docker run -p port_map:3002 --name <container-name> waste4think/ngsi-connector`**
  6. This method of running the connector will start with a default configuration, meaning it expects Fiware Orion to be running locally on port 1026. In order to avoid this and add your configuration, Docker volumes mapping must be used. More info in official [Volume](https://docs.docker.com/storage/volumes/) documentation.
  7. Example of running NGSI Connector API from Docker Hub using volumes would be:
    * **`docker run -p port_map:3002 -v config.js:/opt/nconnector/config.js --name <container-name> waste4think/ngsi-connector`**
  8. In config.js you have some vital configuration settings, but most important Fiware Orion instance URL, more information on about this can be found in the [Configuration]() section.
  9. After these steps you can start using NGSI Connector API, more info about the use of API can be found in the [Usage](#usage) section.
    * **`important`** Fiware Orion default instance is secured by Fiware Pep-Proxy and it will require a token in order to start testing. Change header setting in config.js from 3 to 2 in order to test with a local instance of Fiware Orion.

#### Git Lab
  1. Clone/Download this GitLab repository
  2. Change **`config.js`** most critical information is Fiware Orion Url, more detail regarding this config can be found in the [Configuration]() section.
  3. To have locally your Fiware Orion Context Broker instance, together with MongoDB database, go to `/extras/docker/orion_mongo` folder and issue 
   **`docker-compose up -d`**
  4. Install dependencies for NGSI Connector API:
   **`npm install`**
  5. Start NGSI Connector API:
   **`npm start`**
  6. After these steps you can start using NGSI Connector API, more info about the use of API can be found in the [Usage](#usage) section.

[Top](#waste4think-ngsi-connector-api)

## Usage

Usage section will cover not only how to configure NGSI Connector API but also what endpoints API has to offer as well as rule management.

#### **Configuration**

Configuration for NGSI Connector API is responsible for how API will be started and run. 
Bellow users can find a detail explanation regarding each setting from the **`config.js`** file which is located in the root of this project.

```console
const config = {}; 

config.orion_url = "http://localhost:1026/"; 

config.api_port = "3002"; 

config.ext = [ ".csv", ".json" ]; 

config.https = true; 

config.returnEntities = 20; 

module.exports = config;

config.db = {
  url: "mongodb://localhost:27017/w4t-entities",
  options: {
    user: '',
    pass: '',
    useNewUrlParser: true
  },
}
```

* **`config.orion_url`**
     - Fiware Orion Url, Connector API will use this URL for all Fiware Orion calls.

* **`config.api_port`**
     - NGSI Connector Port, this is a port on which the Connector will run.

* **`config.ext`** 
    - Allowed file extensions, some users want to limit which file type will be allowed due to their system requests.
    
* **`config.https`** 
    - How to run NGSI Connector, if set to the true server will be started in https.

* **`config.returnEntities`** 
    - When getting all entities default value provided by Fiware Orion is 20, meaning a user can get only 20 entities. But this option
allows users to specify the number of entities they will get in return max value is 1000. More on information on this in official Fiware Orion [Documentation](https://fiware-orion.readthedocs.io/en/master/user/pagination/index.html).

* **`config.db`**
    - Structures of entity types that can be uploaded via the Connector are saved in this database. It could be the same MongoDB database that the Orion Context Broker is using for saving its data.

#### **Rules/Structures of Entity Types**
NGSI Connector API has support for rules. They represent a key aspect of API by providing users with a platform for customizing aspects of data creation before sending data to Fiware Orion.

Rules make sure that data that is sent to Fiware Orion keep its integrity and structure, and it becomes essentials when working with big files. Files can contain up to 3000 and more entities making sure that data is sent to Fiware Orion is of the right format, type, etc... become an almost impossible task, rules solve this problem by adding this layer to NGSI Connector API.

In order to make the NGSI Connector more universal, the possibility for users to dynamically create and update various Entity Types and their structure is incorporated. Each structure sets the rules that will be used while parsing specific entities. It is mandatory to first upload the structure of each entity type that will be uploaded. Otherwise, the upload of entities of unknown structure would not be possible.

Rules are customizable, users can create, remove or edit rules via the REST.

* **`Create a structure of Entity Type (Rule)`**
     * Upload a structure of entity type into the request body in JSON format
     * A structure must be added in the following format:
    ```console
       {
        "nameOfNewType": {
            "id": {
            "type": "EntityID",
            "mandatory": "YES"
            },
            "type": {
            "type": "EntityType",
            "mandatory": "YES"
            },
            "nameOfFirstProperty":{
            "type": "Text|ReferenceID|TextList(,)|NumberList(,)|ReferenceIDList(,)|GeoJSON(Point)|Float|Integer|Datetime|StructuredValue(JSON object)|StructuredList([JSON objects])",
            "mandatory": "YES|NO",
            "metadata" :"{'name': 'EnterArbitraryName','value': 'EnterArbitraryValue','type': 'EnterArbitraryType'}||{}",
            "description": "EnterArbitraryDescription"
            },
            "..." : {"...":"..."}
         }
       }
    ```
     * Name of an entity type is very important. The user must name the entity type so that it is the same as a property named 'type' of entities that are going to be uploaded via **`.csv/.json`** file.
     * Structures of entity types are saved in this database
     * Example of entity type structure:
     ```console
        {
            "Vehicle":{
                "id": {"type":"EntityID","mandatory":"YES"},
                "type": {"type":"EntityType","mandatory":"YES"},
                "family":{"type":"Text", "mandatory":"YES"},
                "vehiclePlateIdentifier":{"type":"Text", "mandatory":"YES"},
                "name":{"type":"Text", "mandatory":"NO"},
                "location": {"type":"GeoJSON(Point)","mandatory":"NO", "metadata":{}},
                "refType":{"type":"ReferenceID", "mandatory":"YES"},
                "refInputs":{"type":"ReferenceIDList(,)", "mandatory":"NO"},
	        }
        }
     ```
     * The result of the previously created structure is the name of the rule for each entity:
     ```console
        "properties" : {
                "id" : "idCheck",
                "type" : "typeCheck",
                "family" : "mandatoryCheck",
                "vehiclePlateIdentifier" : "mandatoryCheck",
                "name" : "stringCheck",
                "location" : "locationCheckNoMand",
                "refType" : "mandatoryCheck",
                "refInputs" : "stringToArray",
        }
     ```
    
    * After the entity is created, the `properties` object of that entity is dynamically assigned to values that are the same as the function names that will be used to validate the **`.csv/.json`** files
    * The functions used to check the validity of the values obtained from the **`.csv/.json`** file are:
        * **`idCheck`** 
            - Used for id property, mandatory.
        * **`typeCheck`** 
            - Used for type property, mandatory.
        * **`stringCheck/mandatoryCheck`** 
            - Used for all string properties, the mandatory version requires a value for that property.
        * **`commaNumToUnits/commaNumToUnitsMandatory`** 
            - Used for parsing a value to a float number, the mandatory version requires a value for that property.
        * **`commaNumToUnitsInt/commaNumToUnitsIntMandatory`** 
            - Used for parsing a value to an integer number, the mandatory version requires a value for that property.
        * **`locationCheck/locationCheckMandatory`** 
            - Used to parse **`geo:json`** values, the mandatory version requires a value for that property.
        * **`dateCheck/dateCheckMandatory`** 
            - Used for all DateTime values, the mandatory version requires a value for that property.
        * **`stringToArray/stringToArrayMandatory`** 
            - Used to parse a value to an array object, in **.csv** file these values are separated with a comma **`,`**,
            the mandatory version requires a value for that property.
        * **`stringToArryNum/stringToArryNumMandatory`** 
            - Used to parse a value to an array of numbers, in **.csv** file these values are separated with a comma **`,`**,
           the mandatory version requires a value for that property. 
        * **`structuredValue/structuredValueMandatory`** 
            - Used to parse a value to a structured value - JSON object, this value is a special type of Fiware Orion, 
            the mandatory version requires a value for that property.
         * **`structuredList/structuredListMandatory`** 
            - Used to parse a value to a structured list of JSON objects, this value is a special type of Fiware Orion, 
            the mandatory version requires a value for that property. 

#### **Entities**
* **`Add/Update entities`**
     * As it is shown, each entity property belonges to the one of eleven types. The expected format of the entities that are going to be uploaded is:
        * Type `Text`:
          - Example in **`.csv`** file: `Transaction` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "String", "value": "Transaction", "metadata": {}}`
        * Type `ReferenceID`:
          - Example in **`.csv`** file: `DepositPoint:0001` (with the correct header with property names)
          - Example in **`.json`** file: `"name": {"type": "String","value": "DepositPoint:0001","metadata": {}}`
        * Type `TextList(,)`:
          - Example in **`.csv`** file: `Value1,Value2,Value3` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "List", "value": ["Value1","Value2","Value:3"], "metadata": {}}`
        * Type `NumberList(,)`:
          - Example in **`.csv`** file: `1000.34,1001.45,1002.12` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "List", "value": [1000.34,1001.45,1002.12], "metadata": {}}`
        * Type `ReferenceIDList(,)`:
          - Example in **`.csv`** file: `Waste:1,Waste:2,Waste:3` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "List", "value": ["Waste:1","Waste:2","Waste:3"], "metadata": {}}`
        * Type `GeoJSON(Point)`:
          - Example in **`.csv`** file: `"geometry": { "type": "Point", "coordinates": [ 45.645752, 9.1475983 ] } }` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{ "type": "geo:json","value": {"type": "Point","coordinates": [-2.812263201,43.26375754]},"metadata": {}}`
        * Type `Float`:
          - Example in **`.csv`** file: `123.45` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "List", "value": 123.45, "metadata": {}}`
        * Type `Integer`:
          - Example in **`.csv`** file: `123` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{"type": "List", "value": 123, "metadata": {}}`
        * Type `Datetime`:
          - Example in **`.csv`** file: `2019-12-31T10:10:10+01:00` (with the correct header with property names)
          - Example in **`.json`** file: `"name":{ "type": "DateTime","value": "2019-12-31T10:10:10+01:00","metadata": {}}`
        * Type `StructuredValue(JSON object)`:
          - Example in **`.csv`** file: `{ "refResource":"SortingType:1" , "amount":1, "unit":"C62"}` (with the correct header with property names)
          - Example in **`.json`** file:  `"name": {"type": "List","value": {"amount": 1,"refResource": "SortingType:1","unit": "C62"},"metadata": {}}`
        * Type `StructuredList([JSON objects])`:
          - Example in **`.csv`** file: `[{ "refResource":"SortingType:1" , "amount":1, "unit":"C62"}, { "refResource":"SortingType:2" , "amount":2, "unit":"C62"}]` (with the correct header with property names)
          - Example in **`.json`** file: `"emittedResources": {"type": "List","value": [{"amount": 1,"refResource": "SortingType:1","unit": "C62"},{"amount": 2,"refResource": "SortingType:2","unit": "C62"}],"metadata": {}}`

If property is mandatory, error will be reported if the property does not exist. If the wrong value is provided or a value is not provided when it is optional, a default value will be written. A default value for `"Text"` and `"ReferenceID"` types is an empty string **`""`**, for `"TextList(,)"`, `"NumberList(,)"`, `"ReferenceIDList(,)"` and `"StructuredList([JSON objects])"` it is an empty list **`[]`**. For `"Float"` and `"Integer"` default is zero value **`0`**, for `"Datetime"` the default value is a **`current date and time`**, for `"GeoJSON(Point)"` and `"StructuredValue(JSON object)"` it is an empty object **`"{}"`**. 

#### API

NGSI Connector API documentation can be found in its official [Swagger](backend.waste4think.eu:8082) instance.

All currently available endpoints are:

* **`GET`**
    * **`entities`** 
        * Get all entities for Fiware-Service/Fiware-ServicePath
    * **`entities/:entitiyId`**
        * Get a single entity for Fiware-Service/Fiware-ServicePath
    * **`entities/:entityType`**
        * Get entities for required type, as for previous 2 routes result depend on Fiware-Service/Fiware-ServicePath
    * **`rules`**
        * Get all rules currently supported in  NGSI Connector API
    * **`rules/:ruleId`**
        * Get a single rule description, users can very fast find all info about what properties are mandatory and what type they return.
    * **`typestructure`**
        * Get the rules for creating structures of entity types that are going to be uploaded
    * **`entitytype/:entityType`**
        * Get the structure of specific entity type

* **`POST`**
    * **`entities`**
        * Create entities from user file in Fiware-Service/Fiware-ServicePath
    * **`entities/update`**
        * Update entities from user file in Fiware-Service/Fiware-ServicePath
    * **`entitytype`**
        * Create a structure of specific entity type that will be setting the rules that are going to be used when uploading entities

* **`PUT`**
    * **`entitytype`**
        * Update a structure of specific entity type that will be setting the rules that are going to be used when uploading entities

* **`DELETE`**
    * **`entitytype/:entityType`**
        * Delete from the database a structure of a specific entity type

In the description of API endpoints, we mentioned Fiware-Service/Fiware-ServicePath more information regarding this topic can be found on its official
[Documentation](https://fiware-orion.readthedocs.io/en/master/user/service_path/).
<br />
<br />

This manual won't cover each endpoint in-depth but will focus on key **`POST`** routes because they are the backbone of the entire system.

1. Creating entities from user files, bellow is an example of a typical CURL POST call to NGSI Connector API.

```console
curl -X POST \
  https://localhost:3002/v1/entities \
  -H 'Fiware-Service: waste4think' \
  -H 'Fiware-ServicePath: /some/service/path/' \
  -H 'X-Auth-Token: 1u374V8CFfc822kzfEcCNE0aKDLsyK' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'userFile=@C:\Users\deposit_point.csv'
EOF

```

* **`X-Auth-Token`** This header is mandatory if Fiware Orion instance is secured using Fiware-Pep proxy, more information regarding this topic can be found on its official [Documentation](https://fiware-pep-proxy.readthedocs.io/en/latest/user_guide/).
* **`userFile=@C:\Users\deposit_point.csv`**  This part represents file user send to our API.
    * **`userFIle`** Represent form name, can be any named user want to the user in this example we used `userFile`.
    * **`@C:\Users\deposit_point.csv`** Represent file location on the server/operating system, in this example widows path is used.

2. Update entities from user file, below are an example of a typical CURL POST call to NGSI Connector API.

```console
curl -X POST \
  https://localhost:3002/v1/entities/update \
  -H 'Fiware-Service: waste4think' \
  -H 'Fiware-ServicePath: /some/service/path/' \
  -H 'X-Auth-Token: 1u374V8CFfc822kzfEcCNE0aKDLsyK' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'userFile=@C:\Users\deposit_point.csv'
EOF

```

* On first glance this looks very almost same as the creation of entities but there are few key differences:
    * **`Create`** require that **`.csv`** file structure be same as defined in rules, meaning if a rule has 10 properties first line in the file (this line is also called header)
    must have 10 properties separated with ";".
    * An **`update`** does not require that **`.csv`** file structure must be same as defined in rules, user can update all properties and provide the file as it would when creating
    * or just provide properties that want to be updated.

* **`Examples Create`**

 ```console
    id;type;temperature;pressure;location
    10;Room;24.4;249;Belgrade
    11;Room;33;200;Belgrade
    12;Room;12;2500;Belgrade
```
As mentioned in the rules section, we assume that a user has created a rule object (entity type structure) with the following properties (id, type, temperature, pressure, location). So if we send this file to API no error will be raised because its first line (header) has the same properties as defined in the rule (in the structure of the specific entity type).

* **`Error example`**

 ```console
    id;type;pressure;location
    10;Room;249;Belgrade
    11;Room;200;Belgrade
    12;Room;2500;Belgrade
```
This will raise an error when the user tries to upload the file, the reason is clear in rules we defined 5 properties but in the file we supply only 4. This is important to notice because creation is very strict but it makes sure the integrity of the system by following user-supplied rules.

* **`Examples update`**

Error example when creating entities will work when updating because when updating we can provide full properties (5 in the example above) or only properties we want to update

This is the correct file structure for an update but would result in failure when creating.

 ```console
    id;type;pressure
    10;Room;249
    11;Room;200
    12;Room;2500
```
This structure is also correct, the only difference would be updating all entities instead of only a few.

 ```console
    id;type;temperature;pressure;location
    10;Room;24.4;249;Belgrade
    11;Room;33;200;Belgrade
    12;Room;12;2500;Belgrade
```


[Top](#waste4think-ngsi-connector-api)


### Project
**Waste4Think** is a project funded by the European Commission under the H2020 Research and Innovation Actions (Grant agreement Nº 688995) which has the full title ‘Moving towards Life Cycle Thinking by integrating Advanced Waste Management Systems — Waste4Think’. The project, which involves 5 public administrations, 2 research centers, 2 universities, 9 companies, 1 cluster and an NGO from 6 European countries will have a duration of 42 months.

The project seeks to design tools for the best design and implementation of different technological and non-technological solutions that would enable the improvement of all waste management stages, adopting a global approach and particularly focusing on citizen participation in order to build more sustainable, eco-friendly cities.

These 20 highly innovative solutions will be validated in 4 European pilots. The village of Zamudio in Spain, the southerly Greek city of Halandri, the Portuguese municipality of Cascais and the Italian city of Seveso. They are directed towards the monitoring, collection, and processing of real data, the creation of decision-making tools, the launch of innovative awareness-raising campaigns and prevention campaigns, the introduction of serious games and innovative educational materials to ease the co-creation of new solutions (citizen science), the design of mobile applications to foster collaboration, transparency, and mutual learning and the construction of two pilot plants for the treatment of organic waste and nappies with the aim of making progress in the construction of smart cities and laying the foundations of the circular economy.

The Circular Economy is one of the seven emblematic initiatives that are part of the Europe 2020 strategy, which aims to generate smart, sustainable and conciliatory growth. Today it is Europe’s main strategy for generating growth and jobs, with the backing of the European Parliament and the European Council.

The expected results of the project are to reduce the generation of waste by 8%, achieve a 20% improvement in the classification of urban waste to facilitate their reuse and recycling, reduce waste management costs by 10% and decrease in the same percentage (10%) emissions of GHG.

The project was launched with the kick-off meeting held on 13 and 14 June 2016 at the headquarters of the University of Deusto, Bilbao and in the municipality of Zamudio, Biscay.

The meeting aimed to start the project in an official way with the partners of the different pilots as participants, as well as to establish the lines of action that will be carried out during the project.

### License

NGSI Connector API © 2019 Engineering Ingegneria Informatica S.p.A.

NGSI Connector API is licensed under Affero General Public License (GPL) version 3.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.

Copyright (C) 2019 Engineering Ingegneria Informatica S.p.A.

