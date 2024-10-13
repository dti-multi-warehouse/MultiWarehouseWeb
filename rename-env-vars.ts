// rename-env-vars.ts
Object.keys(process.env).forEach((key) => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      const newKey = key.replace('NEXT_PUBLIC_', '');
      (process.env as any)[newKey] = process.env[key];
    }
  });
  
  console.log('Environment variables renamed for Google Cloud compatibility.');