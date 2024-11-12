import { Member } from "@prisma/client";
import { configPrisma } from "../../config";
import AppError from "../../utils/AppError";

const createMemberIntoDB = async (payload: Member) => {
  const result = await configPrisma.member.create({ data: payload });
  return result;
};

const getAllMembersFromDB = async () => {
  const result = await configPrisma.member.findMany({});
  return result;
};

const getSingleMemberFromDB = async (memberId: string) => {
  const result = await configPrisma.member.findUnique({
    where: { memberId },
  });
  if (result === null) throw new AppError(404, "Member not found!");
  return result;
};

const updateMemberIntoDB = async (
  memberId: string,
  payload: Partial<Member>
) => {
  const result = await configPrisma.member.update({
    where: { memberId },
    data: payload,
  });

  return result;
};

const deleteMemberFromDB = async (memberId: string) => {
  const result = await configPrisma.member.delete({ where: { memberId } });
  return result;
};

export const MemberService = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getSingleMemberFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
