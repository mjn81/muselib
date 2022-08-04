import Image from "next/image";

type Props = {
  profile: string,
  username: string,
  fullname: string,
}

const Profile = ({profile , username , fullname}: Props) => {
  return (
    <div>
      <section className="mb-8">
        <div className="prof-shadow mb-4 overflow-hidden rounded-3xl w-fit flex items-center justify-center">
          <Image
            width="80px"
            height="80px"
            alt={username}
            objectFit="cover"
            src={
              profile ||
              `https://ui-avatars.com/api/?background=6c27ea&color=fff&name=${username}+${fullname}`
            }
          />
        </div>
        <p className="text-gray-400 my-1">Hi!</p>
        <p className="uppercase font-bold text-2xl">
          {username}
        </p>
      </section>
    </div>
  );
}

export default Profile