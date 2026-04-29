import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const transmitterOcrRoutes = [
  {
    path: PATHS.TRANSMITTER_OCR.ROOT,
    element: <Pages.TransmitterOcrPage />,
    handle: {
      crumb: "Transmitter OCR",
    },
    children: [
      {
        index: true,
        element: (
          <Navigate to={PATHS.TRANSMITTER_OCR.MASTER_ACTIVITY} replace />
        ),
      },
      {
        path: PATHS.TRANSMITTER_OCR.MASTER_ACTIVITY,
        handle: {
          crumb: "Master Activity",
        },
        children: [
          {
            index: true,
            element: <Pages.MasterActivityView />,
          },
          {
            path: ":id",
            element: <Pages.MasterActivityItemView />,
            handle: {
              crumb: (params) => `Activity #${params.id}`,
            },
          },
        ],
      },
      {
        path: PATHS.TRANSMITTER_OCR.MASTER_USAGE,
        element: <Pages.MasterUsageView />,
        handle: {
          crumb: "Master Usage",
        },
      },
      {
        path: PATHS.TRANSMITTER_OCR.CHILD_ACTIVITY,
        handle: {
          crumb: "Child Activity",
        },
        children: [
          {
            index: true,
            element: <Pages.ChildActivityView />,
          },
          {
            path: ":id",
            handle: {
              crumb: (params) => `Child Detail #${params.id}`,
            },
            children: [
              {
                index: true,
                element: <Pages.ChildActivityDetailView />,
              },
              {
                path: ":itemId",
                element: <Pages.ChildActivityItemView />,
                handle: {
                  crumb: (params) => `Item #${params.itemId}`,
                },
              },
            ],
          },
        ],
      },
      {
        path: PATHS.TRANSMITTER_OCR.CHILD_USAGE,
        element: <Pages.ChildUsageView />,
        handle: {
          crumb: "Child Usage",
        },
      },
      {
        path: PATHS.TRANSMITTER_OCR.SUMMARY,
        element: <div className="p-4">Activity Summary</div>,
        handle: {
          crumb: "Summary",
        },
      },
      {
        path: PATHS.TRANSMITTER_OCR.MEMBERS,
        element: <div className="p-4">Members</div>,
        handle: {
          crumb: "Members",
        },
      },
    ],
  },
];
