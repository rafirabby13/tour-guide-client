


import TourDetailComponent from "@/components/modules/home/TourDetailComponent";



interface TourDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}


const TourDetail = async({ params }: TourDetailPageProps) => {
   
const { id } =await params;

    return (
        <div>
            <TourDetailComponent id={id}/>
        </div>
    );
};

export default TourDetail;