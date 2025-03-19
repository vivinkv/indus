const nextConfig = {
  images: {
    domains: [
      'localhost',
      'backend', // Add Docker service name
      'indususedcars.com',
      process.env.NEXT_PUBLIC_DOMAIN?.replace('http://', '').replace('https://', '') // Handle dynamic domain
    ].filter(Boolean), // Filter out undefined values
  
  },
 
};

export default nextConfig;