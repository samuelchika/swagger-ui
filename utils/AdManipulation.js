export const imageFilter = (imageData) => {
    return { images: imageData.map(file => file.path)}
}

export const productManipulation = (data) => {
    // if the urgent checkbox is clicked
    data = data?.urgent === 'on' ? { ...data, urgent: "1"} : {...data, urgent: "0"};
    // if the negotiable checkbox is clicked
    data = data?.negotiable === 'on' ? { ...data, negotiable: "1"} : data;
    // if the email checkbox is clicked
    data = data?.email === 'on' ? { ...data, email: "1"} : data;
    // if the phone checkbox is clicked
    data = data?.phone === 'on' ? { ...data, phone: "1"} : data;
    return data;
}

export const vehicleManipulation = (vehicleData) => {
    //var vehicleFeatures = new Array();
    let data = vehicleData;
    if (vehicleData.vehicleFeatures) {
        const vehicleFeature = vehicleData.vehicleFeatures.split(",");
        
        data = {...vehicleData, vehicleFeatures: vehicleFeature }
    }
    // change sellerTypes 
    // dealer = 0
    // private = 1
    data = data.sellerType === 'dealer' ? { ...data, sellerType: "0"} : data
    data = data.sellerType === 'private' ? { ...data, sellerType: "1"} : data;
    // change sellerTypes 
    // Nigerian used = 0
    // Foreign Used = 1
    // New = 2
    data = data.vehicleCondition === 'nigerianUsed' ? { ...data, vehicleCondition: "0"} : data;
    data = data.vehicleCondition === 'foreignUsed' ? { ...data, vehicleCondition: "1"} : data;
    data = data.vehicleCondition === 'new' ? { ...data, vehicleCondition: "2"} : data;
    // if the urgent checkbox is clicked
    data = data?.urgent === 'on' ? { ...data, urgent: "1"} : {...data, urgent: "0"};
    // if the negotiable checkbox is clicked
    data = data?.negotiable === 'on' ? { ...data, negotiable: "1"} : data;
    // if the email checkbox is clicked
    data = data?.email === 'on' ? { ...data, email: "1"} : data;
    // if the phone checkbox is clicked
    data = data?.phone === 'on' ? { ...data, phone: "1"} : data;
    console.log("Vehicle Manipulation", data)
    return data;
}

export const propertyManipulation = (propertyData) => {
    let data = propertyData;
    if (propertyData.propertyType) {
        const propertyType = data.propertyType.split(",");
        data = {...data, propertyType }
    }
    if (propertyData.propertyFacilities) {
        const propertyFacilities = data.propertyFacilities.split(",");
        data = {...data, propertyFacilities }
    }
    data = {...data, location: data.propertyLocation }
    // change sellerTypes 
    // Brand New = 0
    // Refurbished = 1
    // Old = 2
    data = data.propertyCondition === 'brandNew' ? { ...data, propertyCondition: "0"} : data;
    data = data.propertyCondition === 'refurbished' ? { ...data, propertyCondition: "1"} : data;
    data = data.propertyCondition === 'old' ? { ...data, propertyCondition: "2"} : data;
    data = productManipulation(data);

    return data;
}

export const serviceManipulation = (serviceData) => {
    let data = serviceData;
    if(serviceData.otherSkills) {
        const skills = data.otherSkills.split(",");
        data = { ...data, otherSkills: skills };
    }
    data = data?.availableToTravel === 'yes' ? { ...data, availableToTravel : '1'} : { ...data, availableToTravel : '0'};
    data = data?.perMonth === 'on' ? { ...data, paymentType: 'perMonth' } : data;
    data = data?.perMonth === 'on' ? { ...data, paymentType: 'perMonth' } : data;
    data = productManipulation(data);
    return data;
}

export const forSalesManipulation = (forSalesData) => {
    let data = forSalesData;
    if(forSalesData.otherFeatures) {
        const features = data.otherFeatures.split(",");
        data = { ...data, otherFeatures: features };
    }
    // change sellerTypes 
    // agent = 0
    // personal = 0
    data = data.sellerType === 'agent' ? { ...data, sellerType: "1"} : data
    data = data.sellerType === 'personal' ? { ...data, sellerType: "0"} : data;
    data = productManipulation(data);
    return data;
}

export const removeNullObjectsValues = (productDetails) => {
    // convert the value to array, which return [key,value]
    const entries = Object.entries(productDetails);
    // filter the array
    const filteredEntries = entries.filter(([key,value]) => value !== null);
    // convert the array back to object
    return Object.fromEntries(filteredEntries);
}

export const removeUserSecretData = (data) => {
    // convert the value to array, which return [key,value]
    const entries = Object.entries(data);
    // filter the array
    const filteredEntries = entries.filter(([key,value]) => (key !== "salt" && key !== "password"));
    // convert the array back to object
    return Object.fromEntries(filteredEntries);
}