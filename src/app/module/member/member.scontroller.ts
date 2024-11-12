import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberService } from "./member.service";

const createMember = catchAsync(async (req, res, next) => {
  const result = await MemberService.createMemberIntoDB(req?.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res, next) => {
  const result = await MemberService.getAllMembersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getSingleMember = catchAsync(async (req, res, next) => {
  const result = await MemberService.getSingleMemberFromDB(req.params?.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req, res, next) => {
  const result = await MemberService.updateMemberIntoDB(
    req.params?.id,
    req?.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res, next) => {
  await MemberService.deleteMemberFromDB(req.params?.id);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Member successfully deleted",
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};
