import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const Profile = () => {
  return (
    <div className="mx-8">
      <div className=" max-w-[100%] relative">
        <Image
          className="rounded"
          layout="responsive"
          width={100}
          height={100}
          objectFit="cover"
          alt="Image"
          src={
            'https://private-user-images.githubusercontent.com/105733425/300007149-bf035000-a394-4c9f-bf1b-fd1aeea63cd9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDYyODEyMTUsIm5iZiI6MTcwNjI4MDkxNSwicGF0aCI6Ii8xMDU3MzM0MjUvMzAwMDA3MTQ5LWJmMDM1MDAwLWEzOTQtNGM5Zi1iZjFiLWZkMWFlZWE2M2NkOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMTI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDEyNlQxNDU1MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lOWJkNzdlMDQyYmUzZDBlYjBlOTRmYjY1M2E3NmQ2OGY3YzE0NDRhN2RjZjQ1YWQwYTBmZWVhYmNlZGY1OTgwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.spGr-ExV4ODlmiMqqbUopg58I4IivYbjv1nj_JWqUjE'
          }
        />
        <div className="max-w-[10%] shadow-xl bg-white rounded-full absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <Image
            className="rounded-full p-3"
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover"
            alt="Image"
            src="https://avatars.githubusercontent.com/u/124599?v=4"
          />
        </div>
      </div>
      <div className="mt-14 font-semibold text-3xl text-center">
        <span>Lê Văn Tùng - B20DCPT185</span>
      </div>
      <div className="my-4">
        <span className="font-bold">Contact</span>
        <hr className="my-3" />
        <div className="flex items-center gap-3">
          <Mail size={20} />
          <span>tungledxh@gmail.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={20} />
          <span>0386626021</span>
        </div>
      </div>
      <div className="my-4">
        <span className="font-bold">About</span>
        <hr className="my-3" />
        <div className="flex items-center gap-3">
          <span>Bio</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            Hello there! I'm Tung, a passionate individual with a love for
            technology. Fueled by a strong enthusiasm for programming and
            artificial intelligence, I am always eager to explore new
            technologies and apply them to creative projects. Beyond that, I
            have a fondness for writing and sharing knowledge. I frequently
            delve into topics such as personal development, emerging
            technologies, and exciting journeys into the realm of data science.
            With a positive mindset and boundless curiosity, I look forward to
            connecting with the community and sharing my passion. Whether you're
            interested in creative projects, technology, or just want to connect
            and chat, feel free to reach out. I would love to meet you and
            exchange ideas!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
