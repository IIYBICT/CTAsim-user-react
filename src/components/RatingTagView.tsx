import { UserState } from "@/types/user";
import { Tag } from "antd";
/**
 * 等级Tag显示
 * @param param
 * @returns
 */
function RatingTagView({ UserInfo }: { UserInfo: UserState }) {
  return (
    <>
      {UserInfo.ratingId === 0 ? <Tag>{UserInfo.ratingName}</Tag> : ""}
      {UserInfo.ratingId === 1 ? (
        <Tag color="processing">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 2 ? (
        <Tag color="#00B4D5">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 3 ? (
        <Tag color="#00B4D5">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 4 ? (
        <Tag color="#00B4D5">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 5 ? (
        <Tag color="#FF0075">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 6 ? (
        <Tag color="#FF0075">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 7 ? (
        <Tag color="#FF0075">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 8 ? (
        <Tag color="#1B9CE3">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 9 ? (
        <Tag color="#1B9CE3">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 10 ? (
        <Tag color="#1B9CE3">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 11 ? (
        <Tag color="#747ACE">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
      {UserInfo.ratingId === 12 ? (
        <Tag color="#A0529F">{UserInfo.ratingName}</Tag>
      ) : (
        ""
      )}
    </>
  );
}

export default RatingTagView;
