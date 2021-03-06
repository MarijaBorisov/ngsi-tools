# <a name="top"></a>Waste4Think Ngsi Connector Api
<br />
<br />
Waste4Think Ngsi Connector API is part of backend implementation of Waste4Think
the project, providing an API interface for other participants in the project.
Using this interface, users can do several operations:
* Create entities from a file. The Ngsi Connector API allows users to create a large
number of entities directly from .csv or .json files, it also has customizable
rules for defining how data from files will be checked.
* Update entities from a file, it can support full or partial update depending on
user configuration.
* Supporting all Fiware Orion GET operations with queries, the goal is providing
users with the ability to check data creation.
This project is part of [Waste4Think](http://waste4think.eu/), for more
infomation check the Waste4Think [Info](http://waste4think.eu/about-waste4think) section.

### Content
*  [Description](#description)
*  [Install](#install)
    * [Docker Hub](#docker-hub)
    * [Git Lab](#git-lab)
*  [Usage](#usage)
    * [Configuration](#configuration)
    * [Rules](#rules)
    * [Metadata](#metadata)
    * [Api](#api)
*  [Project](#project)
*  [License](#license)
  

### Description

Ngsi Connector API allows you to create or update entities in Fiware Orion instance from files, add rules and query entity information. Using the Ngsi Connector API,
you are able to create a large number of entities while internal setting rules which make sure data integrity stay intact. The connector is providing a quick and safe
way of adding data to Fiware Orion instance from different sources, at the moment of writing supporting file formats are **`.csv`** and **`.json`**.

With Connector, you are able to also query data in Fiware Orion this part of its structure is set up to act like proxy witch fully support all Fiware Orion GET and query methods regarding entities. 

More information regarding Fiware Orion can be found on it's official [documentation](https://fiware-orion.readthedocs.io/en/master/).
<br />

###### Ngsi Connector API work flow:

Ngsi Connector API is a NodeJs implementation of the NGSIv2 REST API binding developed as a part
of the FIWARE platform.

1) **`Parsing`**:

- Parse input file, by converting it into a plain json object.

2) **`Checking`**:

- Checking parsed json object structure.
- Converting a parsed object to Ngsi v2 API data structure, according to predefined rules.

3) **`Writing`**:

- Write data to Fiware Orion instance.
- Handle response from Fiware Orion.

4) **`Reporting`**:

- Prepare a report on the operation, including the number of successfully created entities, 
entities with errors and detail of each entity created including id, type, and status.


[Top](#waste4think-ngsi-connector-api)

## Install

NGSI Connector API can be installed from two sources, one of them is this repository and other is Docker Hub wich can be found on
[Docker](https://cloud.docker.com/u/waste4think/repository/docker/waste4think/ngsi-connector) repository.

###### Docker Hub
  1. Make sure you have Docker and Docker-Compose installed on you server/machine, more info about this can be found on following [Documentation](https://docs.docker.com/docker-for-windows/install/)
  2. Go to Waste4think official [Docker](https://cloud.docker.com/u/waste4think/repository/docker/waste4think/ngsi-connector) repository.
  3. Example of running Ngsi Connector API from Docker Hub would be:
    * **`docker run -p port_map:3002 --name <container-name> waste4think/ngsi-connector`**
  6. This method of running connector will start with default configuration, meaning it expect Fiware Orion to be running locally on port 1026. In order to avoid this and add your
  configuration Docker volumes mapping must be used. More info in officiall [Volume](https://docs.docker.com/storage/volumes/) documentation.
  7. Example of running Ngsi Connector APi from Docker Hub using volumes would be:
    * **`docker run -p port_map:3002 -v config.js:/opt/nconnector/config.js --name <container-name> waste4think/ngsi-connector`**
  8. In config.js you have some vital configuration settings, but most important Fiware Orion instance URL, more information on about this can be found in [Configuration]() section.
  9. After these steps you can start using Ngsi Connector API, more info about use of API can be found in [Usage](#usage) section.
    * **`important`** Fiware Orion default instance is secured by Fiware Pep-Proxy and it will require token in order to start testing
  change header setting in config.js from 3 to 2 in order to test with local instance of Fiware Orion.

###### Git Lab
  1. Clone/Download this gihtub repository
  2. Change **`config.js`** most critical information is Fiware Orion Url, more detail regarding this config can be found in [Configuration]() section.
  3. Install dependencies for Ngsi Connector API:
    * **`npm install`**
  4. Start Ngsi Connector API:
    * **`npm start`**
  5. After these steps you can start using Ngsi Connector API, more info about use of API can be found in [Usage](#usage) section.

[Top](#waste4think-ngsi-connector-api)

## Usage

Usage section will cover how to configure Ngsi Connector API but also what endpoints API have to offer as well rule managment.

###### **Configuration**

Configuration for Ngsi Connector API is responsible for how API will be started and run. 
Bellow users can found detail explanation regarding each setting from **`config.js`** file which is located in the root of this project.

```console
const config = {}; 

config.orion_url = "http://localhost:1026/"; 

config.api_port = "3002"; 

config.ext = [ ".csv", ".json" ]; 

config.https = true; 

config.returnEntities = 20; 

module.exports = config;
```

* **`config.orion_url`**
     - Fiware Orion Url, Connector API will use this URL for all Fiware Orion calls.

* **`config.api_port`**
     - Ngsi Connector Port, this is port on with Connector will run.

* **`config.ext`** 
    - Allowed file extentions, some users want to limit which file type will be allowed due to their system request.
    
* **`config.https`** 
    - How to run Ngsi Connector, if set to the true server will be started in https.

* **`config.returnEntities`** 
    - When getting all entities default value provided by Fiware Orion is 20, meaning a user can get only 20 entities. But this option
allows users to specify the number of entities they will get in return max value is 1000. More on information on this in official Fiware Orion [Documentation](https://fiware-orion.readthedocs.io/en/master/user/pagination/index.html).

###### **Rules**

Ngsi Connector API has support for rules, they represent a key aspect of API by providing users with a platform for customizing aspect of data creation 
before sending data to Fiware Orion.

Rules make sure that data which is sent to Fiware Orion keep its integrity and structure, it becomes essentials when working with big files. Files can contain up to 3000 and more entities
making sure that data is sent to Fiware Orion is of the right format, type, etc.. become an almost impossible task, rules solve this problem by adding this layer to Ngsi Connector API.

Rules are customizable, users can create, remove or edit rules, at the moment of writing rules can be created only manually but REST option will be added in future.

**Rule operations**:

* **`Create Rule`**
    * Navigate to rules folder.
    * Make a new file, depending on server commands for this can differ most common one for Linux systems is **`sudo touch`** followed with the name of the rule.
    * Name of a rule is very important, a user must name the file with type property that he expects from **`.csv/.json`** file.
    * Example of **`.csv`** file
    
    ```console
    id;type;temperature;pressure
    10;Room;24.4;249
    11;Room;33;200
    12;Room;12;2500
    ```
    
    * On this example we can notice that value for type is Room, so we must name our rule Room.js inside of rules folder.
    
* **`Add functions to rule`**
    * Once we have Room.js created in rules folder then users must add structure to it.
    * Open Room.js file, the first time it is empty, some aspect of each rule is same and we are going to cover it.
    
    ```console
    const rules = require('../utilities');
    
    
    module.exports = Room;
    ```
    
    * **`const rules = require('../utilities');`**
        * This line will never change in any rule user create, it is mandatory. What we are doing here is just importing functions that will be used later
        for various checks.
    * **`module.exports = Room;`**
        * Here user exports rule to be used in other parts of system, important to mention is that export name is same as file name. This filed is mandatory.
* **`Add properties to rule`**
    
    ```console
    const rules = require('../utilities');
    
    const Room = {
        id:
        type:
        temperature:
        pressure:
    }
    
    module.exports = Room;
    ```
    
      * Here we expanded the previous example by creating a simple object with Room name, the name must be equal to file name. Then we add properties from **`.csv`**
        file example above, each property must be equal to expected properties that will be on file.    
      *, In short, you put the first line of **`.csv`** file or keys from **`.json`** files as properties.
      
* **`Add functions to rule properties`**
    
    ```console
    const Room = {
        id: rules.idCheck,
        type: rules.typeCheck,
        temperature: rules.stringCheck
        pressure: rules.stringCheckMandatory
    }
    ```
    * So we added function to rules, by typing **`rules.`** we have access to all functions available in rules object, those functions are:
        * **`idCheck`** 
            - Used for all id properties mandatory.
        * **`typeCheck`** 
            - Used for all types properties mandatory.
        * **`commaToUnits/commaToUnitsMandatory`** 
            - Used for parse of string to a number, mandatory version requires value for that property.
        * **`locationCheck/locationCheckMandatory`** 
            - Used to parse **`geo:json`** values, mandatory version requires value for that property.
        * **`stringToArray/stringToArrayMandatory`** 
            - Used to parse string from files to array object, in **.csv** file these values are separated with **`,`**,
            mandatory version requires value for that property.
        * **`stringToArryNum/stringToArryNumMandatory`** 
            - Used to parse string from file to array of Numbers, in **.csv** file these values are separated with **`,`**,
            mandatory version requires value for that property. 
        * **`structuredValue/structuredValueMandatory`** 
            - Used to parse string from file to structure value, this value is a special type of Fiware Orion, 
            the mandatory version requires value for that property.

* **`Remove rule`**
    * To remove rule simply delete created file.

###### API

Ngsi Connector API documentation can be found in its official [Swagger](backend.waste4think.eu:81) instance.

All currently available endpoints are:

* **`GET`**
    * **`entities`** 
        * Get all entities for Fiware-Service/Fiware-ServicePath
    * **`entities/:entitiyId`**
        * Get single entity for Fiware-Service/Fiware-ServicePath
    * **`entities/:entityType`**
        * Get entities for required type, as for previous 2 routes result depend on Fiware-Service/Fiware-ServicePath
    * **`rules`**
        * Get all rules currently supported in  Ngsi Connector API
    * **`rules/:ruleId`**
        * Get single rule description, users can very fast find all info what properties are mandatory and what type they return.

* **`POST`**
    * **`entities`**
        * Create entities from user file in Fiware-Service/Fiware-ServicePath
    * **`entities/update`**
        * Update entities from user file in Fiware-Service/Fiware-ServicePath

In description of API endpoints we mentioned Fiware-Service/Fiware-ServicePath more information regarding this topic can be found on its official
[Documentation](https://fiware-orion.readthedocs.io/en/master/user/service_path/).
<br />
<br />

This manual wont cover each endpoint in depth but will focus on key **`POST`** routes because they are backbone of entire system.

1. Creating entities from user file, bellow is example of typical CURL POST call to NGSI Connector API.

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

2. Update entities from user file, below are an example of typical CURL POST call to NGSI Connector API.

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
    * **`Create`** require that **`.csv`** file structure be same as defined in rules, meaning if a rule has 10 properties first line in the file(this line is also called header)
    must have 10 properties separated with ";".
    * **`Update`** does not require that **`.csv`** file structure must be same as defined in rules, user can update all properties and provide the file as it would when creating
    * or just provide properties that want to be updated.

* **`Examples Create`**

 ```console
    id;type;temperature;pressure;location
    10;Room;24.4;249;Belgrade
    11;Room;33;200;Belgrade
    12;Room;12;2500;Belgrade
```
As mentioned in rules section we assume that user created rule object with following properties (id,type,temperature,pressure,location) more about this can be found in rules
section. So if we send this file to API no error will be raised because its first line(header) have same properties as defined in rule.

* Error example

 ```console
    id;type;pressure;location
    10;Room;249;Belgrade
    11;Room;200;Belgrade
    12;Room;2500;Belgrade
```
This will raise an error when the user tries to upload the file, the reason is clear in rules we defined 5 properties but in the file we supply only 4. This is important to notice because
creation is very strict but it makes sure the integrity of the system by following user-supplied rules.

* **`Examples update`**

Error example when creating entities will work when updating because when updating we can provide full properties (5 in the example above) or only properties we want to update

This is correct file structure for an update but would result in failure when creating.

 ```console
    id;type;pressure
    10;Room;249
    11;Room;200
    12;Room;2500
```
This structure is also correct, only difference would be updating all entities instead of only few.

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

These 20 highly innovative solutions will be validated in 4 European pilots. The village of Zamudio in Spain, the southerly Greek city of Halandri, the Portuguese municipality of Cascais and the Italian city of Seveso. They are directed towards the monitoring, collection and processing of real data, the creation of decision making tools, the launch of innovative awareness-raising campaigns and prevention campaigns, the introduction of serious games and innovative educational materials to ease the co-creation of new solutions (citizen science), the design of mobile applications to foster collaboration, transparency and mutual learning and the construction of two pilot plants for the treatment of organic waste and nappies with the aim of making progress in the construction of smart cities and laying the foundations of the circular economy.

The Circular Economy is one of the seven emblematic initiatives that are part of the Europe 2020 strategy, which aims to generate smart, sustainable and conciliatory growth. Today it is Europe’s main strategy for generating growth and jobs, with the backing of the European Parliament and the European Council.

The expected results of the project are to reduce the generation of waste by 8%, achieve a 20% improvement in the classification of urban waste to facilitate their reuse and recycling, reduce waste management costs by 10% and decrease in the same percentage (10%) emissions of GHG.

The project was launched with the kick-off meeting held on 13 and 14 June 2016 at the headquarters of the University of Deusto, Bilbao and in the municipality of Zamudio, Biscay.

The meeting aimed to start the project in an official way with the partners of the different pilots as participants, as well as to establish the lines of action that will be carried out during the project.

### License

Ngsi Connector API © 2019 Engineering Ingegneria Informatica S.p.A.

Ngsi Connector API is licensed under Affero General Public License (GPL) version 3.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.

Copyright (C) 2019 Engineering Ingegneria Informatica S.p.A.

