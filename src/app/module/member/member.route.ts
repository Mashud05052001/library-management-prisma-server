import { Router } from "express";
import { MemberController } from "./member.scontroller";

const router = Router();

router.post("/", MemberController.createMember);
router.get("/", MemberController.getAllMembers);
router.get("/:id", MemberController.getSingleMember);
router.put("/:id", MemberController.updateMember);
router.delete("/:id", MemberController.deleteMember);

export const MemberRoutes = router;
