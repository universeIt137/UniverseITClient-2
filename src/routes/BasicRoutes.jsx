import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/clientSide/Home/HomePage";
import AboutUs from "../pages/clientSide/AboutUs/AboutUs";
import CoursesPage from "../pages/clientSide/Courses/CoursesPage";

import CourseDetails from "../pages/clientSide/courseDetails/CourseDetails";
import Profile from "../pages/adminSide/profile/Profile";
import AddCourse from "../pages/adminSide/addCourse/AddCourse";
import AdmissionRequest from "../pages/adminSide/admissionRequest/AdmissionRequest";
import CreateSeminar from "../pages/adminSide/seminar/CreateSeminar";
import ManageSeminar from "../pages/adminSide/seminar/ManageSeminar";
import SeminarPage from "../pages/adminSide/seminar/SeminarPage";
import AddBlogPage from "../pages/adminSide/addBlog/AddBlogPage";
import ManageBlog from "../pages/adminSide/manageBlog/ManageBlog";
import UpdateBlog from "../pages/adminSide/updateBlog/UpdateBlog";
import ManageHomepageContent from "../pages/adminSide/manageHomepageContent/ManageHomepageContent";
import ManageComments from "../pages/adminSide/ManageComments/ManageComments";
import ManageCountDown from "../pages/adminSide/manageCountDown/ManageCountDown";
import AddFacultyPage from "../pages/adminSide/addFaculty/AddFacultyPage";
import AddTestimonialPage from "../pages/adminSide/addTestimonial/AddTestimonialPage";
import ManageFacultyPage from "../pages/adminSide/manageFaculty/ManageFacultyPage";
import UpdateFacultyPage from "../pages/adminSide/updateFaculty/UpdateFacultyPage";
import ManageTestimonialPage from "../pages/adminSide/manageTestimonial/ManageTestimonialPage";
import UpdateTestimonials from "../pages/adminSide/updateTestimonials/UpdateTestimonials";
import ManageStudentGallary from "../pages/adminSide/manageStudentGallary/ManageStudentGallary";
import ManageCoursePage from "../pages/adminSide/manageCourse/ManageCoursePage";
import UpdateCoursePage from "../pages/adminSide/updateCourse/UpdateCoursePage";
import ManageCourseCategory from "../pages/adminSide/ManageCourseCategory/ManageCourseCategory";
import UpdateCourseCategory from "../pages/adminSide/UpdateCourseCategory/UpdateCourseCategory";
import ManageCourseSemester from "../pages/adminSide/ManageCourseSemester/ManageCourseSemester";
import UpdateCourseSemester from "../pages/adminSide/UpdateCourseSemester/UpdateCourseSemester";
import ManageCourseObjective from "../pages/adminSide/ManageCourseObjective/ManageCourseObjective";
import BlogPage from "../pages/clientSide/blog/BlogPage";
import BlogDetails from "../pages/clientSide/blog/BlogDetails";
import AdmissionPage from "../pages/clientSide/onlineAdmission/AdmissionPage";
import Seminar from "../pages/clientSide/Seminar/Seminar";
import SeminarForm from "../pages/clientSide/SeminarForm/SeminarForm";
import SuccessStoryPage from "../pages/clientSide/SuccessStoryPage/SuccessStoryPage";
import Faculties from "../pages/clientSide/Faculties/Faculties";
import CertificateVerification from "../pages/clientSide/certificateVerification/CertificateVerification";
import ManageCertificate from "../pages/adminSide/ManageCertificate/ManageCertificate";
import CreateCertificate from "../pages/adminSide/CreateCertificate/CreateCertificate";
import UpdateCertificate from "../pages/adminSide/UpdateCertificate/UpdateCertificate";
import AddSuccessStory from "../pages/adminSide/AddSuccessStory/AddSuccessStory";
import ManageSuccessStory from "../pages/adminSide/ManageSuccessStory/ManageSuccessStory";
import UpdateSuccessStory from "../pages/adminSide/UpdateSuccessStory/UpdateSuccessStory";
import Login from "../pages/clientSide/Login/Login";
import Register from "../pages/clientSide/Register/Register";
import PrivateRouts from "../PrivateRouts/PrivateRouts";
import AddMember from "../pages/adminSide/teamRelatedPages/addMember/AddMember";
import ManageMember from "../pages/adminSide/teamRelatedPages/manageMember/ManageMember";
import UpdateMember from "../pages/adminSide/teamRelatedPages/updateMember/UpdateMember";
import TeamMemberPage from "../pages/clientSide/teamMemberpage/TeamMemberPage";
import CareerPage from "../pages/clientSide/careerRelatedPage/CareerPage";
import AddCareerPage from "../pages/adminSide/careerRelatedPages/addCareer/AddCareerPage";
import ManageCareerPage from "../pages/adminSide/careerRelatedPages/manageCareer/ManageCareerPage";
import UpdateCareerPage from "../pages/adminSide/careerRelatedPages/updateCareer/UpdateCareerPage";
import CareerDetailsPage from "../pages/clientSide/careerRelatedPage/CareerDetailsPage";
import ApplicationPage from "../pages/clientSide/careerRelatedPage/applicationPage/ApplicationPage";
import ManageJob from "../pages/adminSide/applyJobRelatedPage/manageJob/ManageJob";
import CourseCategoryPage from "../pages/adminSide/courseRelatedPage/CourseCategoryPage";
import PopularCoursePage from "../pages/clientSide/Courses/PopularCoursePage";
import ViewPdf from "../components/clientSide/ViewPdf/ViewPdf";
import ContactUsPage from "../pages/clientSide/contactUs/ContactUsPage";
import ManageUsers from "../pages/adminSide/ManageUsers/ManageUsers";
import Feedback from "../pages/clientSide/feedbackPage/Feedback";
import AddFeedback from "../pages/adminSide/feedbackRelatedPages/addFeedback/AddFeedback";
import ManageFeedback from "../pages/adminSide/feedbackRelatedPages/manageFeedback/ManageFeedback";
import UpdateFeedback from "../pages/adminSide/feedbackRelatedPages/updateFeedback/UpdateFeedback";
import PhotoGallery from "../pages/clientSide/SuccessStoryPage/PhotoGallery";
import ManageRepresentative from "../pages/adminSide/representativeRelatedPages/ManageRepresentative";
import UpdateRepresentative from "../pages/adminSide/representativeRelatedPages/UpdateRepresentative";
import ManageGeneration from "../pages/adminSide/certificateGenerateRelatedPages/ManageGeneration";
import UpdateGeneration from "../pages/adminSide/certificateGenerateRelatedPages/UpdateGeneration";
import RepresentativeList from './../pages/clientSide/representativePage/RepresentativeList';
import RepresentativeDetails from "../pages/adminSide/representativeRelatedPages/RepresentativeDetails";
import ManageBlogRep from "../pages/adminSide/manageBlog/ManageBlogRep";
import CertificateDownload from "../pages/adminSide/certificateGenerateRelatedPages/CertificateDownload";


const BasicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: 'aboutUs',
                element: <AboutUs />
            },
            {
                path: 'certified',
                element: <CertificateVerification />
            },
            {
                path: 'courses',
                element: <CoursesPage />
            },
            {
                path: '/courses/:category',
                element: <PopularCoursePage></PopularCoursePage>
            },
            {
                path: "blogs",
                element: <BlogPage />
            },
            {
                path: "blogDetails/:id",
                element: <BlogDetails />
            },
            {
                path: "faculties",
                element: <Faculties />
            },
            {
                path: "/team-members",
                element: <TeamMemberPage></TeamMemberPage>
            },
            {
                path: "/courseDetails/:id",
                element: <CourseDetails></CourseDetails>
            },
            {
                path: "/onlineAdmission",
                element: <AdmissionPage></AdmissionPage>
            },
            {
                path: "/freeSeminar",
                element: <Seminar />
            },
            {
                path: "/seminarForm/:id",
                element: <SeminarForm />
            },
            {
                path: "/videoGallery",
                element: <SuccessStoryPage />
            },

            {
                path: "/photoGallery",
                element: <PhotoGallery></PhotoGallery>
            },
            // career related routes 
            {
                path: "/career",
                element: <CareerPage></CareerPage>
            },
            {
                path: "/career/:id",
                element: <CareerDetailsPage></CareerDetailsPage>
            },
            {
                path: "/apply-job/:id",
                element: <ApplicationPage></ApplicationPage>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "/contact-us",
                element: <ContactUsPage/>
            },
            {
                path: "/feedback",
                element:<Feedback></Feedback>
            },
            {
                path : "/representative",
                element : <RepresentativeList></RepresentativeList>
            }
            

        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRouts><DashboardLayout></DashboardLayout></PrivateRouts>,
        children: [
            {
                path: "/dashboard",
                element: <Profile></Profile>
            },
            {
                path: "addCourse",
                element: <AddCourse></AddCourse>
            },
            {
                path: "course-category",
                element: <CourseCategoryPage></CourseCategoryPage>
            },
            {
                path: "admissionRequest",
                element: <AdmissionRequest></AdmissionRequest>,

            },
            {
                path: "profile",
                element: <Profile></Profile>
            },

            {
                path: "createSeminar",
                element: <CreateSeminar></CreateSeminar>
            },
            {
                path: "manageSeminar",
                element: <ManageSeminar></ManageSeminar>
            },

            {
                // for manage seminar reqeust from student 
                path: "seminar",
                element: <SeminarPage></SeminarPage>
            },
            {
                path: "addBlog",
                element: <AddBlogPage></AddBlogPage>
            },
            {
                path: "manageBlog",
                element: <ManageBlog></ManageBlog>
            },
            {
                path: "manageBlogRep",
                element: <ManageBlogRep></ManageBlogRep>
            },
            {
                path: "/dashboard/updateBlog/:id",
                element: <UpdateBlog></UpdateBlog>
            },
            {
                path: "manageHomepageContent",
                element: <ManageHomepageContent></ManageHomepageContent>
            },
            {
                path: "manageComments",
                element: <ManageComments />
            },
            {
                path: "manageCountDown",
                element: <ManageCountDown></ManageCountDown>
            },
            {
                path: "addFaculty",
                element: <AddFacultyPage></AddFacultyPage>
            },
            {
                path: "addTestimonial",
                element: <AddTestimonialPage></AddTestimonialPage>
            },
            {
                path: "manageFaculty",
                element: <ManageFacultyPage></ManageFacultyPage>
            },
            {
                path: "/dashboard/updateFaculty/:id",
                element: <UpdateFacultyPage></UpdateFacultyPage>
            },
            {
                path: "manageTestimonial",
                element: <ManageTestimonialPage></ManageTestimonialPage>
            },
            {
                path: "/dashboard/updateTestimonial/:id",
                element: <UpdateTestimonials></UpdateTestimonials>
            },

            {
                path: "managePhotoGallary",
                element: <ManageStudentGallary></ManageStudentGallary>
            },

            {
                path: "manageCourses",
                element: <ManageCoursePage></ManageCoursePage>
            },
            {
                path: "updateCourse/:id",
                element: <UpdateCoursePage></UpdateCoursePage>
            },
            {
                path: "manageCourseCategory/:id",
                element: <ManageCourseCategory />
            },
            {
                path: "updateCourseCategory/:courseId/:categoryId",
                element: <UpdateCourseCategory />
            },
            {
                path: "manageCourseSemester/:id",
                element: <ManageCourseSemester />
            },
            {
                path: "updateCourseSemester/:courseId/:semesterId",
                element: <UpdateCourseSemester />
            },
            {
                path: "manageCourseObjective/:id",
                element: <ManageCourseObjective />
            },
            {
                path: "createCertificate",
                element: <CreateCertificate />
            },
            {
                path: "manageCertificate",
                element: <ManageCertificate />
            },
            {
                path: "/dashboard/updateCertificate/:id",
                element: <UpdateCertificate />
            },
            {
                path: "addSuccessStory/:id",
                element: <AddSuccessStory />
            },
            {
                path: "manageSuccessStory",
                element: <ManageSuccessStory />
            },
            {
                path: "/dashboard/updateSuccessStory/:id",
                element: <UpdateSuccessStory />
            },

            {
                path: "add-member",
                element: <AddMember></AddMember>
            },
            {
                path: "manage-member",
                element: <ManageMember></ManageMember>
            },
            {
                path: "update-member/:id",
                element: <UpdateMember></UpdateMember>
            },

            // career related routes 
            {
                path: "add-career",
                element: <AddCareerPage></AddCareerPage>
            },
            {
                path: "manage-career",
                element: <ManageCareerPage></ManageCareerPage>
            },
            {
                path: "update-career/:id",
                element: <UpdateCareerPage></UpdateCareerPage>
            },
            {
                path: "manage-job",
                element: <ManageJob></ManageJob>
            },
            {
                path: "manageUsers",
                element: <ManageUsers />
            },

            {
                path: "add-feedback",
                element: <AddFeedback></AddFeedback>
            },
            {
                path: "manage-feedback",
                element: <ManageFeedback></ManageFeedback>
            },
            {
                path: "update-feedback/:id",
                element: <UpdateFeedback></UpdateFeedback>
            },

            // representative related routes 
            {
                path: "manage-representative",
                element: <ManageRepresentative></ManageRepresentative>
            },
            {
                path: "update-representative/:id",
                element: <UpdateRepresentative></UpdateRepresentative>
            },
            {
                path: "details-representative/:id",
                element: <RepresentativeDetails></RepresentativeDetails>
            },
            
            // Certification Generation related Routes 
            {
                path: "manage-generation",
                element: <ManageGeneration></ManageGeneration>
            },
            {
                path: "update-generation/:id",
                element: <UpdateGeneration></UpdateGeneration>
            },
            {
                path: "generate-certificate/:id",
                element: <CertificateDownload></CertificateDownload>
            }







        ]
    },
    {
        path: '/viewPdf',
        element: <ViewPdf/>
    }
]);

export default BasicRoutes;