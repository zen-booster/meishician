function initJobInfo(data) {
  const { name, companyName, jobTitle, city, domain } = data;
  const result = {
    name: {
      content: name,
      isPublic: true,
    },
    companyName: {
      content: companyName,
      isPublic: true,
    },
    jobTitle: {
      content: jobTitle,
      isPublic: true,
    },
    city: {
      content: city,
      isPublic: true,
    },
    domain: {
      content: domain,
      isPublic: true,
    },
  };

  if (data.phoneNumber) {
    const phoneNumber = {
      content: data.phoneNumber,
      isPublic: true,
    };
    result.phoneNumber = phoneNumber;
  }

  return result;
}

export default initJobInfo;
