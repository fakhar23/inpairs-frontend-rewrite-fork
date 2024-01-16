"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Basics, GeneralInfo, Scales, UserInfo } from "..";
import profileBg from "@/assets/profileBgC.png";

const Profile = ({ data }: any) => {
  const params = useParams<{ id: string }>();
  const user_id = params["id"] || "";
  const content = { answer: "", key: "", answer_id: 1 };

  const [ranking, setRanking] = useState<boolean>(true);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [showQuestion, setShowQuestion] = useState(false);

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       setLoading(true)

  //       if (!user_id) {
  //         return
  //       }

  //       if (user?.sharableId !== user_id) {
  //         setCanEdit(false)
  //       } else {
  //         setCanEdit(true)
  //       }

  //       const result = await APIHelper.getProfileData(user_id as string, true)
  //       dispatch({
  //         type: 'ADD_QUESTIONS_ANSWERS_TO_USER',
  //         payload: {
  //           questions_answers: transformAnswers(
  //             result.data.data.questions_answers
  //           ),
  //           stats: result.data.data.stats
  //         }
  //       })
  //       dispatch({
  //         type: 'ADD_MATCH_IMAGES_PICTURE',
  //         payload: {
  //           images: result.data.data.images as string[]
  //         }
  //       })
  //     } catch (error) {
  //       Sentry.captureException(error)
  //       if (error instanceof AxiosError) {
  //         if (error.status === 401) {
  //           router.push('/login')
  //           return
  //         }
  //         toast.error('Something went wrong')
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   })()
  // }, [router, dispatch, user?.sharableId])

  // const isAdministrationRole =
  //   user && ['ADMIN', 'MATCHMAKER'].includes(user?.role)

  const isAdministrationRole = true;

  // useEffect(() => {
  //   if (isAdministrationRole) {
  //     setRanking(true);
  //   }
  // }, [isAdministrationRole]);

  // if (!user?.questionsAnswers || !router.isReady || loading) {
  //   return (
  //     <div className="flex justify-center items-center h-[70vh]">
  //       <ClipLoader color="#EF3E37" size={75} aria-label="Loading..." />
  //     </div>
  //   );
  // }

  return (
    <UserProfileLayout>
      <section className="relative flex justify-end mx-auto px-[4rem] bg-profile bg-no-repeat	bg-cover [&_h2]:mb-[1rem] [&_h2]:text-purple [&_h2]:text-[2rem] [&_p]:text-gray-gunmetal md:flex-col sm:px-[1rem]">
        <Image
          src={profileBg}
          alt="profile background"
          className="absolute top-0 left-0 w-full h-full blur-3xl -z-10 top-[-7rem]"
        />
        <UserInfo
          ranking={ranking}
          user_id={user_id as string}
          hideEdit={!canEdit}
          onlyShowFirstName={true}
        />

        <section className="flex flex-wrap h-auto resize-y justify-center w-[75%] px-[1rem] py-[3rem] md:w-full md:px-0 relative">
          {/* left column */}
          <div className="mr-[2rem] w-[45%] [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem] [&>*]:shadow-md md:w-full">
            <GeneralInfo
              title="About me"
              content={content}
              question_key="about_yourself"
              canEdit={canEdit}
            />
            <GeneralInfo
              title="Passions"
              content={content}
              question_key="passionate"
              canEdit={canEdit}
            />
            <GeneralInfo
              title="Interests"
              content={content}
              question_key="interests"
              canEdit={canEdit}
            />
          </div>

          {/* Right column */}
          <div className="w-[45%] flex flex-col [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem]  [&>*]:shadow-md [&_div]:flex [&_div]:justify-around [&_div]:gap-[1.5rem] [&_div]:border-b [&_div]:border-rose-200 [&_div]:p-[0.5rem] [&_div>*]:w-[50%] md:w-full">
            <Basics />
            <Scales />
          </div>
        </section>
      </section>
    </UserProfileLayout>
  );
};

export default Profile;