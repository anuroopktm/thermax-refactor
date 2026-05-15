import { Navigate, type Params } from "react-router-dom";
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
            element: <Pages.MasterActivityModelView />,
            handle: {
              crumb: (params: Params) => `Activity #${params.id}`,
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
              crumb: (params: Params) => `Child Detail #${params.id}`,
            },
            children: [
              {
                index: true,
                element: <Pages.ChildActivityDetailView />,
              },
              {
                path: ":itemId",
                element: <Pages.ChildActivityModelView />,
                handle: {
                  crumb: (params: Params) => `Item #${params.itemId}`,
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
        handle: {
          crumb: "Activity Summary",
        },
        children: [
          {
            index: true,
            element: <Pages.ActivitySummaryMasterView />,
          },
          {
            path: ":masterId",
            handle: {
              crumb: (params: Params) => `Master Activity #${params.masterId}`,
            },
            children: [
              {
                index: true,
                element: <Pages.ActivitySummaryChildView />,
              },
              {
                path: ":childId",
                element: <Pages.ActivitySummaryView />,
                handle: {
                  crumb: (params: Params) =>
                    `Child Activity #${params.childId}`,
                },
              },
            ],
          },
        ],
      },
      {
        path: PATHS.TRANSMITTER_OCR.MEMBERS,
        element: <Pages.TransmitterMembersView />,
        handle: {
          crumb: "Members",
        },
      },
    ],
  },
];
